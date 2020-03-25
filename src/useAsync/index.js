import { useState, useEffect, useCallback, useRef } from "react";
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { isDocumentVisible } from '../utils';
import { getCache, setCache } from "../utils/cache";
import limit from '../utils/limit';
import subscribeFocus from '../utils/windowFocus';
import subscribeVisible from '../utils/windowVisible';

// TODO：
// 1.有缓存时，不重新请求
// 2.refreshDeps
// 3.考虑分页、的情况
// 4.并行请求

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
  const cancelRef = useRef(false); // 是否取消
  const pollingTimerRef = useRef(null); // 轮询定时器
  const pollingWhenVisibleFlagRef = useRef(false); // 视窗获取焦点标识
  const loadingDelayTimerRef = useRef(null); // 延迟loading

  const unsubscribeRef = useRef([]); // 取消订阅集合

  const _run = useCallback((...args) => {
    cancelRef.current = false;

    // 取消轮询定时器
    if (pollingTimerRef.current) {
      clearTimeout(pollingTimerRef.current);
    }

    // 取消延迟loading
    if (loadingDelayTimerRef.current) {
      clearTimeout(loadingDelayTimerRef.current);
    }

    set(s => ({ ...s, loading: !loadingDelay, params: args }));

    // 设置延迟loading定时器
    if (loadingDelay) {
      loadingDelayTimerRef.current = setTimeout(() => {
        set(s => ({ ...s, loading: true }));
      }, loadingDelay);
    } else {
      loadingDelayTimerRef.current = null;
    }

    return asyncFn(...args).then(data => {
      if (!cancelRef.current) {
        if (loadingDelayTimerRef.current) {
          clearTimeout(loadingDelayTimerRef.current);
        }

        set(s => ({ ...s, data }));

        if (cacheKey) {
          setCache(cacheKey, data, cacheTime);
        }
        onSuccess(data, args);
      }
    }).catch(error => {
      if (!cancelRef.current) {
        if (loadingDelayTimerRef.current) {
          clearTimeout(loadingDelayTimerRef.current);
        }

        set(s => ({ ...s, error }));
        onError(error, args);
      }
      throw error;
    }).finally(() => {
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

      set(s => ({ ...s, loading: false }));
    });
  }, []);
  
  const debounceRun = debounceInterval ? debounce(_run, debounceInterval) : undefined;
  const throttleRun = throttleInterval ? throttle(_run, throttleInterval) : undefined;

  const run = useCallback((...args)=>{
    if(debounceRun){
      debounceRun(...args);
      return Promise.resolve(null);
    }

    if(throttleRun){
      throttleRun(...args);
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
    cancelRef.current = true;
    if (debounceRun) {
      debounceRun.cancel();
    }

    if (throttleRun) {
      throttleRun.cancel();
    }

    // 取消轮询定时器
    if (pollingTimerRef.current) {
      clearTimeout(pollingTimerRef.current);
    }

    // 取消延迟loading
    if (loadingDelayTimerRef.current) {
      clearTimeout(loadingDelayTimerRef.current);
    }

    // 取消订阅
    unsubscribeRef.current.forEach(s => s());

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
      run(...defaultParams);
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

    return cancel;
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