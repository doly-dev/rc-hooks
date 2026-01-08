import { useState, useEffect, useCallback, useRef } from 'react';
import { shallowEqual, isArray, isUndefined, noop } from 'ut2';
import usePersistFn from '../usePersistFn';
import useUpdateEffect from '../useUpdateEffect';
import useLatest from '../useLatest';
import useUnmountedRef from '../useUnmountedRef';
import AsyncCalss, { getCache, clearCache, Options, AsyncFunction } from './Async';

export { clearCache };

type AsyncOptions<R = any, P extends any[] = any[]> = Partial<
  {
    /**
     * @description 在初始化时自动执行异步函数。如果为 `false`，则需要手动调用 `run` 触发执行。
     * @default true
     */
    autoRun: boolean;

    /**
     * @description `refreshDeps` 变化，会触发重新执行。仅在 `autoRun = true` 时生效。
     */
    refreshDeps: any[];

    /**
     * @description 如果 `autoRun=true` 自动执行 `run` 的默认参数。
     */
    defaultParams: P;

    /**
     * @description 设置 `loading` 延迟时间，避免闪烁，单位为毫秒。
     */
    loadingDelay: number;

    /**
     * @private 该API仅用于内部传递，请不要使用。
     */
    __INTERNAL_FORMAT__: (res: R, params: P) => R;

    /**
     * @description 初始化默认 `loading` 值。
     * @default 默认值等于 `autoRun && !loadingDelay`
     */
    defaultLoading: boolean;

    /**
     * @description 初始化的 `data`。
     */
    initialData: R | undefined;
  } & Omit<Options<R, P>, 'formatResult'>
>;

export type { AsyncOptions, AsyncFunction };

type AsyncReturn<R = any, P extends any[] = any[]> = {
  /**
   * @description 执行异步函数的参数数组。比如你触发了 `run(1, 2, 3)`，则 `params` 等于 `[1, 2, 3]`。
   * @default []
   */
  params: P;

  /**
   * @description 异步函数正在执行。
   */
  loading: boolean;

  /**
   * @description 异步函数抛出的异常。
   * @default undefined
   */
  error: null | Error;

  /**
   * @description 异步函数的返回值。
   * @default undefined
   */
  data?: R | undefined;

  /**
   * @description 执行异步函数。
   * @param args 异步函数的参数。
   * @returns
   */
  run: (...args: P) => Promise<R>;

  /**
   * @description 使用上一次的 `params`，重新执行异步函数。
   * @returns
   */
  refresh: () => Promise<R>;

  /**
   * @description 取消当前请求。如果有轮询，停止轮询。
   * @returns
   */
  cancel: () => void;

  /**
   * @description 直接修改 `data`。
   * @param newData 新的 data 值。
   * @returns
   */
  mutate: (newData: R | ((oldData: R) => R) | undefined) => void;
};

interface UseAsync {
  <R = any, P extends any[] = any[]>(
    asyncFn: AsyncFunction<R, P>,
    options?: Omit<AsyncOptions<R, P>, 'debounceInterval' | 'throttleInterval'> &
      (
        | { debounceInterval: number }
        | { throttleInterval: number }
        | { debounceInterval: number; throttleInterval: number }
      )
  ): Omit<AsyncReturn<R, P>, 'run' | 'refresh'> & {
    /**
     * @description 使用防抖或节流方式执行异步函数。
     * @param args 异步函数的参数。
     * @returns
     */
    run: (...args: P) => Promise<null>;

    /**
     * @description 使用上一次的 `params`，重新执行异步函数。
     * @returns
     */
    refresh: () => Promise<null>;
  };
  <R = any, P extends any[] = any[]>(
    asyncFn: AsyncFunction<R, P>,
    options?: Omit<AsyncOptions<R, P>, 'debounceInterval' | 'throttleInterval'>
  ): AsyncReturn<R, P>;
}

/**
 * 管理异步函数。
 *
 * @param {Function} asyncFn 异步函数。
 * @param {Object} [options] 配置项。
 * @param {boolean} [options.autoRun=true] 在初始化时自动执行异步函数。如果设置为 `false`，则需要手动调用 `run` 触发执行。默认 `true`。
 * @param {*} [options.initialData] 初始化的 `data`。
 * @param {boolean} [options.defaultLoading=false] 初始化默认 `loading` 值。默认值等于 `autoRun && !loadingDelay`。
 * @param {Array} [options.defaultParams] 如果 `autoRun=true` 自动执行 `run` 的默认参数。
 * @param {Array} [options.refreshDeps] 在 `autoRun = true` 时，`refreshDeps` 变化，会触发重新执行。
 * @param {Function} [options.onBefore] 异步函数执行前触发，参数为 `params`。
 * @param {Function} [options.onSuccess] 异步函数 `resolve` 时触发，参数为 `data` 和 `params`。
 * @param {Function} [options.onError] 异步函数报错时触发，参数为 `error` 和 `params`。
 * @param {string} [options.cacheKey] 缓存的键值。启用缓存机制，异步成功结果将被缓存。如果多个相同 cacheKey 的异步同时触发中，将共享第一个异步结果。
 * @param {number} [options.cacheTime=5*60*1000] 缓存时间。单位毫秒。
 * @param {boolean} [options.persisted=false] 持久化数据。当有缓存数据时，不再执行异步函数。需要配合 `cacheKey` `cacheTime` 使用。默认 `false`。
 * @param {number} [options.loadingDelay] 设置 `loading` 延迟时间，避免闪烁，单位为毫秒。
 * @param {number} [options.pollingInterval] 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run`。
 * @param {boolean} [options.pollingWhenHidden=true] 在页面隐藏时，是否继续轮询。如果为 `true`，不会停止轮询。如果为 `false`，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。默认 `true`。
 * @param {boolean} [options.refreshOnWindowFocus=false] 在屏幕重新获取焦点或重新显示时，是否重新发起请求。如果为 `false`，不会重新发起请求。如果为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。默认 `false`。
 * @param {number} [options.focusTimespan=5000] 屏幕重新聚焦，重新发起请求时间间隔。需要配置 `refreshOnWindowFocus` 使用。默认 `5000`。
 * @param {number} [options.debounceInterval] 防抖间隔，单位为毫秒，设置后，请求进入防抖模式。
 * @param {number} [options.throttleInterval] 节流间隔，单位为毫秒，设置后，请求进入节流模式。
 * @returns {Object}
 * @example
 * const { data, error, loading, run, cancel, refresh, mutate } = useAsync(asyncFn, options);
 */
const useAsync: UseAsync = <R = any, P extends any[] = any[]>(
  asyncFn: AsyncFunction<R, P>,
  options?: AsyncOptions<R, P>
) => {
  const {
    autoRun = true,
    refreshDeps = [],
    defaultParams,
    loadingDelay,
    __INTERNAL_FORMAT__,
    defaultLoading,
    initialData,

    cacheKey = '',
    cacheTime = 5 * 60 * 1000,
    persisted = false,
    onSuccess = noop,
    onError = noop,
    onFinally = noop,
    onBefore = noop,
    pollingInterval = 0,
    pollingWhenHidden = true,
    refreshOnWindowFocus = false,
    focusTimespan = 5000,
    debounceInterval,
    throttleInterval
  } = options || {};

  const [state, set] = useState<{
    params: P;
    loading: boolean;
    error: null | Error;
    data?: R;
  }>(() => ({
    // 参数兼容非array的情况
    params: [] as unknown as P,
    loading: !!(isUndefined(defaultLoading) ? autoRun && !loadingDelay : defaultLoading),
    error: null,
    data: cacheKey ? getCache<R>(cacheKey) : initialData
  }));
  const latestState = useLatest(state);
  const unmountedRef = useUnmountedRef();

  const loadingDelayTimerRef = useRef<any>(null); // 延迟loading

  // 持久化一些函数
  const asyncFnPersist = usePersistFn(asyncFn);
  const onSuccessPersist = usePersistFn(onSuccess);
  const onErrorPersist = usePersistFn(onError);
  const onFinallyPersist = usePersistFn(onFinally);
  const onBeforePersist = usePersistFn(onBefore);

  const internalFormatRef = useLatest(__INTERNAL_FORMAT__);

  // 异步执行前
  const handleBefore = useCallback(
    (p: P) => {
      onBeforePersist(p);

      // 取消延迟loading
      if (loadingDelayTimerRef.current) {
        clearTimeout(loadingDelayTimerRef.current);
      }

      // 缓存数据
      const cacheData = cacheKey ? getCache<R>(cacheKey) : undefined;

      // 没有缓存数据 或 没有开启持久缓存，设置loading
      if (!cacheData || !persisted) {
        if (
          latestState.current.loading !== !loadingDelay ||
          !shallowEqual(latestState.current.params, p)
        ) {
          set((s) => ({ ...s, loading: !loadingDelay, params: p }));
        }

        // 设置延迟loading定时器
        if (loadingDelay) {
          loadingDelayTimerRef.current = setTimeout(() => {
            if (!unmountedRef.current) {
              set((s) => ({ ...s, loading: true }));
            }
          }, loadingDelay);
        }
      }
    },
    [cacheKey, latestState, loadingDelay, onBeforePersist, persisted, unmountedRef]
  );

  // 异步执行成功后
  const handleSuccess = useCallback(
    (res: R, args: P) => {
      if (loadingDelayTimerRef.current) {
        clearTimeout(loadingDelayTimerRef.current);
      }

      set((s) => ({ ...s, data: res, error: null, loading: false }));
      onSuccessPersist(res, args);
    },
    [onSuccessPersist]
  );

  // 异步执行失败后
  const handleError = useCallback(
    (err: Error, args: P) => {
      if (loadingDelayTimerRef.current) {
        clearTimeout(loadingDelayTimerRef.current);
      }

      set((s) => ({ ...s, error: err, loading: false }));
      onErrorPersist(err, args);
    },
    [onErrorPersist]
  );

  const asyncInstanceRef = useRef<AsyncCalss<R, P>>(undefined);

  if (!asyncInstanceRef.current) {
    asyncInstanceRef.current = new AsyncCalss<R, P>(asyncFnPersist, {
      cacheKey,
      cacheTime,
      persisted,
      formatResult: internalFormatRef.current,
      onSuccess: handleSuccess,
      onError: handleError,
      onFinally: onFinallyPersist,
      onBefore: handleBefore,
      debounceInterval,
      throttleInterval,
      pollingInterval,
      pollingWhenHidden,
      refreshOnWindowFocus,
      focusTimespan
    });
  }

  useUpdateEffect(() => {
    asyncInstanceRef.current!.updateOptions({
      cacheKey,
      cacheTime,
      persisted,
      formatResult: internalFormatRef.current,
      onSuccess: handleSuccess,
      onError: handleError,
      onFinally: onFinallyPersist,
      onBefore: handleBefore,
      debounceInterval,
      throttleInterval,
      pollingInterval,
      pollingWhenHidden,
      refreshOnWindowFocus,
      focusTimespan
    });
  }, [
    onSuccessPersist,
    onErrorPersist,
    cacheKey,
    cacheTime,
    persisted,
    debounceInterval,
    throttleInterval,
    onFinallyPersist,
    onBeforePersist,
    pollingInterval,
    pollingWhenHidden,
    refreshOnWindowFocus,
    focusTimespan,
    handleSuccess,
    handleError,
    handleBefore
  ]);

  // 执行异步
  const run = useCallback((...args: P) => {
    return asyncInstanceRef.current!.run.apply(asyncInstanceRef.current, args);
  }, []);

  // 使用上一次执行异步的参数，重新执行
  const refresh = useCallback(() => {
    return asyncInstanceRef.current!.refresh();
  }, []);

  const cancel = useCallback(() => {
    asyncInstanceRef.current!.cancel();

    // 取消延迟loading
    if (loadingDelayTimerRef.current) {
      clearTimeout(loadingDelayTimerRef.current);
    }

    set((s) => ({ ...s, loading: false }));
  }, []);

  // 突变
  const mutate = (newData: R | undefined | ((oldData: R) => R)) => {
    if (typeof newData === 'function') {
      // @ts-ignore
      set((s) => ({ ...s, data: newData(state.data) }));
    } else {
      set((s) => ({ ...s, data: newData }));
    }
  };

  // autoRun=true 时，refreshDeps 变化，将重新执行
  useUpdateEffect(() => {
    // 区分 React.StrictMode 下触发
    if (autoRun && isArray(refreshDeps) && refreshDeps.length > 0) {
      refresh();
    }
  }, [autoRun].concat(refreshDeps));

  useEffect(() => {
    // 默认自动执行
    if (autoRun) {
      // 支持默认参数
      const fmtDefaultParams = isArray(defaultParams)
        ? defaultParams
        : ((typeof defaultParams !== 'undefined' ? [defaultParams] : []) as unknown as P);
      run.apply(void 0, fmtDefaultParams);
    }

    // 如果销毁过，可以重新恢复异步实例
    asyncInstanceRef.current!.resume();

    return () => {
      cancel();
      asyncInstanceRef.current!.destroy(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    run,
    cancel,
    mutate,
    refresh
  };
};

export default useAsync;
