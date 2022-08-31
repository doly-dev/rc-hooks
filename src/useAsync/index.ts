import { useState, useEffect, useCallback, useRef } from 'react';
import usePersistFn from '../usePersistFn';
import useUpdateEffect from '../useUpdateEffect';
import { getCache } from '../utils/cache';
import AsyncCalss, { Options, AsyncFunction } from './Async';

export type AsyncOptions<R = any, P extends any[] = any[]> = Partial<
  {
    autoRun: boolean;
    refreshDeps: any[];
    defaultParams: P;
    loadingDelay: number;
    /**
     * @private 该API仅用于内部传递，请不要使用。
     */
    __INTERNAL_FORMAT__: (res: R, params: P) => R;
    /** @deprecated */
    defaultLoading: boolean;
    /** @deprecated */
    initialData: R;
  } & Omit<Options<R, P>, 'formatResult'>
>;

export type {
  AsyncFunction
}

// 空函数
const noop = () => { };

// 异步方法hooks
function useAsync<R = any, P extends any[] = any[]>(
  asyncFn: AsyncFunction<R, P>,
  options?: AsyncOptions<R, P>
) {
  const {
    autoRun = true,
    refreshDeps = [],
    defaultParams,
    loadingDelay,
    __INTERNAL_FORMAT__,
    defaultLoading = false,
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
  }>({
    // 参数兼容非array的情况
    params: [] as unknown as P,
    loading: defaultLoading,
    error: null,
    data: cacheKey ? getCache<R>(cacheKey) : initialData
  });
  const loadingDelayTimerRef = useRef<any>(null); // 延迟loading

  // 持久化一些函数
  const asyncFnPersist = usePersistFn(asyncFn);
  const onSuccessPersist = usePersistFn(onSuccess);
  const onErrorPersist = usePersistFn(onError);
  const onFinallyPersist = usePersistFn(onFinally);
  const onBeforePersist = usePersistFn(onBefore);

  const internalFormatRef = useRef(__INTERNAL_FORMAT__);
  if (internalFormatRef.current !== __INTERNAL_FORMAT__) {
    internalFormatRef.current = __INTERNAL_FORMAT__;
  }

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
        set((s) => ({ ...s, loading: !loadingDelay, params: p }));

        // 设置延迟loading定时器
        if (loadingDelay) {
          loadingDelayTimerRef.current = setTimeout(() => {
            set((s) => ({ ...s, loading: true }));
          }, loadingDelay);
        }
      }
    },
    [cacheKey, loadingDelay, onBeforePersist, persisted]
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

  // @ts-ignore
  const asyncInstanceRef: React.MutableRefObject<AsyncCalss<R, P>> = useRef();

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
    asyncInstanceRef.current.updateOptions({
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
    return asyncInstanceRef.current.run(...args);
  }, []);

  // 使用上一次执行异步的参数，重新执行
  const refresh = useCallback(() => {
    return asyncInstanceRef.current.refresh();
  }, []);

  const cancel = useCallback(() => {
    asyncInstanceRef.current.cancel();

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
    if (autoRun && Array.isArray(refreshDeps) && refreshDeps.length > 0) {
      refresh();
    }
  }, [autoRun, ...refreshDeps]);

  useEffect(() => {
    // 默认自动执行
    if (autoRun) {
      // 支持默认参数
      const fmtDefaultParams = Array.isArray(defaultParams)
        ? defaultParams
        : ((typeof defaultParams !== 'undefined' ? [defaultParams] : []) as unknown as P);
      run(...fmtDefaultParams);
    }

    // 如果销毁过，可以重新恢复异步实例
    asyncInstanceRef.current.resume();

    return () => {
      cancel();
      asyncInstanceRef.current.destroy(false);
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
}

export default useAsync;
