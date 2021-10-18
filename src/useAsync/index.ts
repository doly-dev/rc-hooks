import { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import usePersistFn from '../usePersistFn';
import useUpdateEffect from '../useUpdateEffect';
import { isDocumentVisible } from '../utils';
import { getCache, setCache } from '../utils/cache';
import limit from '../utils/limit';
import subscribeFocus from '../utils/windowFocus';
import subscribeVisible from '../utils/windowVisible';

export type AsyncFunction<R = any, P extends any[] = any> = (...args: P) => Promise<R>;

export type AsyncBaseOptions<R = any, P extends any[] = any> = Partial<{
  autoRun: boolean;
  refreshDeps: any[];
  defaultParams: P;
  defaultLoading: boolean;
  initialData: R;
  cacheKey: string;
  cacheTime: number;
  persisted: boolean;
  onSuccess: (data: R, params: P) => void;
  onError: (error: Error, params: P) => void;
  pollingInterval: number;
  pollingWhenHidden: boolean;
  refreshOnWindowFocus: boolean;
  focusTimespan: number;
  loadingDelay: number;
  debounceInterval: number;
  throttleInterval: number;
}>;

export type AsyncOptions<R = any, P extends any[] = any, FP = any> = AsyncBaseOptions<R, P> & {
  formatResult: (res: FP, params: P) => R;
};

export type AsyncResult<R = any, P extends any[] = any> = {
  run: (...args: P) => Promise<R | null>;
  cancel: () => void;
  mutate: (newData: R | ((oldData: R) => R) | undefined) => void;
  refresh: () => Promise<R | null>;
  params: P;
  loading: boolean;
  error: null | Error;
  data?: R | undefined;
};

// 空函数
const noop = () => {};

// 异步方法hooks
export function useAsync<R = any, P extends any[] = any>(
  asyncFn: AsyncFunction<R, P>,
  options?: AsyncBaseOptions<R, P>
): AsyncResult<R, P>;
export function useAsync<R = any, P extends any[] = any, FP = any>(
  asyncFn: AsyncFunction<FP, P>,
  options?: AsyncOptions<R, P, FP>
): AsyncResult<R, P>;
export function useAsync<R = any, P extends any[] = any, FP = any>(
  asyncFn: AsyncFunction<FP, P>,
  options?: AsyncBaseOptions<R, P> | AsyncOptions<R, P, FP>
) {
  const {
    autoRun = true,
    refreshDeps = [],
    defaultParams = [],
    defaultLoading = false,
    initialData,
    cacheKey = '',
    cacheTime = 5 * 60 * 1000,
    persisted = false,
    onSuccess = noop,
    onError = noop,
    formatResult,
    pollingInterval = 0,
    pollingWhenHidden = true,
    refreshOnWindowFocus = false,
    focusTimespan = 5000,
    loadingDelay,
    debounceInterval,
    throttleInterval
  } = (options || {}) as AsyncOptions<R, P, FP>;

  const [state, set] = useState<{
    params: P;
    loading: boolean;
    error: null | Error;
    data?: R;
  }>({
    // 参数兼容非array的情况
    params: (Array.isArray(defaultParams) ? defaultParams : [defaultParams]) as any,
    loading: defaultLoading,
    error: null,
    data: cacheKey ? getCache(cacheKey) : initialData
  });
  const counterRef = useRef(0); // 计数器用于判定，或多次执行，只取最后一次结果
  const pollingTimerRef = useRef<any>(null); // 轮询定时器
  const pollingWhenVisibleFlagRef = useRef(false); // 视窗获取焦点标识
  const loadingDelayTimerRef = useRef<any>(null); // 延迟loading
  const unmountFlagRef = useRef(false); // 卸载标识

  const unsubscribeRef = useRef<Function[]>([]); // 取消订阅集合

  // 持久化一些函数
  const asyncFnPersist = usePersistFn(asyncFn);
  const onSuccessPersist = usePersistFn(onSuccess);
  const onErrorPersist = usePersistFn(onError);
  const formatResultRef = useRef(formatResult);
  formatResultRef.current = formatResult;

  const _run: AsyncFunction<R, P> = useCallback((...args) => {
    // 取消轮询定时器
    if (pollingTimerRef.current) {
      clearTimeout(pollingTimerRef.current);
    }

    // 取消延迟loading
    if (loadingDelayTimerRef.current) {
      clearTimeout(loadingDelayTimerRef.current);
    }

    // 确保返回最后结果，并且不会返回取消的结果
    counterRef.current += 1;
    const currentCount = counterRef.current;

    // 缓存数据
    const cacheData = cacheKey ? getCache(cacheKey) : undefined;

    // 没有缓存数据 或 没有开启持久缓存，设置loading
    if (!cacheData || !persisted) {
      set(s => ({ ...s, loading: !loadingDelay, params: args }));

      // 设置延迟loading定时器
      if (loadingDelay) {
        loadingDelayTimerRef.current = setTimeout(() => {
          set(s => ({ ...s, loading: true }));
        }, loadingDelay);
      } else {
        loadingDelayTimerRef.current = null;
      }
    }

    const wrapperAsyncFn = () => {
      // fix: 同时多次调用run，并通过then处理时，前面调用的会返回undefined导致异常的问题
      return new Promise<R>((resolve, reject) => {
        // 有缓存数据，且开启持久缓存，不需要再次请求
        if (cacheData && persisted) {
          if (!unmountFlagRef.current && currentCount === counterRef.current) {
            onSuccessPersist(cacheData, args);
            resolve(cacheData);
          }
        } else {
          asyncFnPersist(...args)
            .then((data: any) => {
              if (!unmountFlagRef.current && currentCount === counterRef.current) {
                if (loadingDelayTimerRef.current) {
                  clearTimeout(loadingDelayTimerRef.current);
                }
                const fmtData =
                  typeof formatResultRef.current === 'function'
                    ? formatResultRef.current(data, args)
                    : data;

                set(s => ({
                  ...s,
                  data: fmtData,
                  error: null,
                  loading: false
                }));

                if (cacheKey) {
                  setCache(cacheKey, fmtData, cacheTime);
                }
                onSuccessPersist(fmtData, args);

                resolve(fmtData);
              }
            })
            .catch((error: Error) => {
              if (!unmountFlagRef.current && currentCount === counterRef.current) {
                if (loadingDelayTimerRef.current) {
                  clearTimeout(loadingDelayTimerRef.current);
                }

                set(s => ({ ...s, error, loading: false }));
                onErrorPersist(error, args);

                reject(error);
              }
            });
        }
      });
    };

    return wrapperAsyncFn().finally(() => {
      if (!unmountFlagRef.current && currentCount === counterRef.current) {
        // 轮询
        if (pollingInterval) {
          if (!isDocumentVisible() && !pollingWhenHidden) {
            pollingWhenVisibleFlagRef.current = true;
            return;
          }

          pollingTimerRef.current = setTimeout(() => {
            run(...args);
          }, pollingInterval);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounceRunRef = useRef(debounceInterval ? debounce(_run, debounceInterval) : undefined);
  const throttleRunRef = useRef(throttleInterval ? throttle(_run, throttleInterval) : undefined);

  const run = useCallback(
    (...args: P) => {
      if (debounceRunRef.current) {
        debounceRunRef.current(...args);
        return Promise.resolve(null);
      }

      if (throttleRunRef.current) {
        throttleRunRef.current(...args);
        return Promise.resolve(null);
      }

      return _run(...args);
    },
    [_run]
  );

  const refresh = useCallback(() => {
    return run(...state.params);
  }, [run, state.params]);

  const rePolling = useCallback(() => {
    if (pollingWhenVisibleFlagRef.current) {
      pollingWhenVisibleFlagRef.current = false;
      refresh();
    }
  }, [refresh]);

  const cancel = useCallback(() => {
    if (debounceRunRef.current) {
      debounceRunRef.current.cancel();
    }

    if (throttleRunRef.current) {
      throttleRunRef.current.cancel();
    }

    // 取消轮询定时器
    if (pollingTimerRef.current) {
      clearTimeout(pollingTimerRef.current);
    }

    // 取消延迟loading
    if (loadingDelayTimerRef.current) {
      clearTimeout(loadingDelayTimerRef.current);
    }

    pollingWhenVisibleFlagRef.current = false;

    counterRef.current += 1;

    set(s => ({ ...s, loading: false }));
  }, []);

  // autoRun=true 时，refreshDeps 变化，将重新执行
  useUpdateEffect(() => {
    if (autoRun) {
      refresh();
    }
  }, [...refreshDeps]);

  // 突变
  const mutate = (newData: R | undefined | ((oldData: R) => R)) => {
    if (typeof newData === 'function') {
      set(s => ({ ...s, data: (newData as Function)(state.data) }));
    } else {
      set(s => ({ ...s, data: newData }));
    }
  };

  useEffect(() => {
    // 默认自动执行
    if (autoRun) {
      // 支持默认参数
      run(...(state.params as any));
    }

    const unsubscribeArr = unsubscribeRef.current;

    // 订阅页面显示时轮询
    if (pollingInterval) {
      unsubscribeArr.push(subscribeVisible(rePolling));
    }

    // 订阅屏幕聚焦时请求
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(refresh, focusTimespan);
      unsubscribeArr.push(subscribeFocus(limitRefresh));
    }

    return () => {
      unmountFlagRef.current = true;
      cancel();
      // 取消订阅
      unsubscribeArr.forEach(s => s());
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
