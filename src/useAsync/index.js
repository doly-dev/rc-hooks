import { useState, useEffect, useCallback, useRef } from "react";
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { isDocumentVisible } from '../utils';
import { getCache, setCache } from "../utils/cache";
import limit from '../utils/limit';
import subscribeFocus from '../utils/windowFocus';
import subscribeVisible from '../utils/windowVisible';

// TODO：
// 有缓存时，不重新请求，获取缓存时判断params是否相同，长缓存?

// 空函数
const noop = () => { };

// 异步方法hooks
function useAsync(asyncFn, {
  autoRun = true,
  defaultParams = [],
  defaultLoading = false,
  initialData,
  cacheKey = '',
  cacheTime = 5 * 60 * 1000,
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
} = {}) {
  const [state, set] = useState({
    params: [],
    loading: !!autoRun || defaultLoading,
    error: null,
    data: cacheKey ? getCache(cacheKey) : initialData
  });
  const counterRef = useRef(0); // 计数器用于判定，或多次执行，只去最后一次结果
  const pollingTimerRef = useRef(null); // 轮询定时器
  const pollingWhenVisibleFlagRef = useRef(false); // 视窗获取焦点标识
  const loadingDelayTimerRef = useRef(null); // 延迟loading
  const unmountFlagRef = useRef(false); // 卸载标识

  const unsubscribeRef = useRef([]); // 取消订阅集合

  const _run = useCallback((...args) => {
    // 取消轮询定时器
    if (pollingTimerRef.current) {
      clearTimeout(pollingTimerRef.current);
    }

    // 取消延迟loading
    if (loadingDelayTimerRef.current) {
      clearTimeout(loadingDelayTimerRef.current);
    }

    counterRef.current += 1;
    const currentCount = counterRef.current; // 确保返回最后结果，并且不会返回取消的结果

    set(s => ({ ...s, loading: !loadingDelay, params: args }));

    // 设置延迟loading定时器
    if (loadingDelay) {
      loadingDelayTimerRef.current = setTimeout(() => {
        set(s => ({ ...s, loading: true }));
      }, loadingDelay);
    } else {
      loadingDelayTimerRef.current = null;
    }
    // fix: 同时多次调用run，并通过then处理时，前面调用的会返回undefined导致异常的问题
    return new Promise((resolve, reject) => {
      asyncFn(...args).then(data => {
        if (!unmountFlagRef.current && currentCount === counterRef.current) {
          if (loadingDelayTimerRef.current) {
            clearTimeout(loadingDelayTimerRef.current);
          }
          const fmtData = typeof formatResult === 'function' ? formatResult(data) : data;

          set(s => ({ ...s, data: fmtData, error: null, loading: false }));

          if (cacheKey) {
            setCache(cacheKey, fmtData, cacheTime);
          }
          onSuccess(fmtData, args);

          resolve(fmtData, args);
        }
      }).catch(error => {
        if (!unmountFlagRef.current && currentCount === counterRef.current) {
          if (loadingDelayTimerRef.current) {
            clearTimeout(loadingDelayTimerRef.current);
          }

          set(s => ({ ...s, error, loading: false }));
          onError(error, args);

          reject(error, args);
        }
      }).finally(() => {
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
    });
  }, []);

  const debounceRunRef = useRef(debounceInterval ? debounce(_run, debounceInterval) : undefined);
  const throttleRunRef = useRef(throttleInterval ? throttle(_run, throttleInterval) : undefined);

  const run = useCallback((...args) => {
    if (debounceRunRef.current) {
      debounceRunRef.current(...args);
      return Promise.resolve(null);
    }

    if (throttleRunRef.current) {
      throttleRunRef.current(...args);
      return Promise.resolve(null);
    }

    return _run(...args);
  }, []);

  const refresh = useCallback(() => {
    return run(...state.params);
  }, []);

  const rePolling = useCallback(() => {
    if (pollingWhenVisibleFlagRef.current) {
      pollingWhenVisibleFlagRef.current = false;
      refresh();
    }
  }, []);

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

  // 突变
  const mutate = (newData) => {
    if (typeof newData === 'function') {
      set(s => ({ ...s, data: newData(state.data) }));
    } else {
      set(s => ({ ...s, data: newData }));
    }
  }

  useEffect(() => {
    // 默认自动执行
    if (autoRun) {
      // 参数兼容非array的情况
      const _params = Array.isArray(defaultParams) ? defaultParams : [defaultParams];
      run(..._params);
    }

    // 订阅页面显示时轮询
    if (pollingInterval) {
      unsubscribeRef.current.push(subscribeVisible(rePolling));
    }

    // 订阅屏幕聚焦时请求
    if (refreshOnWindowFocus) {
      const limitRefresh = limit(refresh, focusTimespan);
      unsubscribeRef.current.push(subscribeFocus(limitRefresh));
    }

    return () => {
      unmountFlagRef.current = true;
      cancel();
      // 取消订阅
      unsubscribeRef.current.forEach(s => s());
    };
  }, []);

  return {
    ...state,
    run,
    cancel,
    mutate,
    refresh
  }
}

export default useAsync;