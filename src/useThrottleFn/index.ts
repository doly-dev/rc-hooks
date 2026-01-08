/* eslint-disable react-hooks/refs */
import { useRef } from 'react';
import { throttle } from 'ut2';
import useUnmount from '../useUnmount';
import useLatest from '../useLatest';

/**
 * 用来处理节流函数的 Hook。
 *
 * @param {Function} fn 需要节流的函数。
 * @param {number} [wait=0] 节流等待时间，单位为毫秒。默认 `0`。
 * @param {boolean} [immediate=true] 是否在延迟开始前调用。默认 `true`。
 * @returns
 * @example
 * const [value, setValue] = useState(0);
 * // 频繁调用 run，但只会每隔 500ms 执行一次函数。
 * const { run } = useThrottleFn(setValue, 500);
 */
function useThrottleFn<T extends (...args: any[]) => any>(fn: T, wait = 0, immediate = true) {
  const refFn = useLatest<T>(fn);
  const throttleRun = useRef<ReturnType<typeof throttle>>(undefined);
  if (!throttleRun.current) {
    throttleRun.current = throttle((...args) => refFn.current.apply(void 0, args), wait, immediate);
  }

  useUnmount(() => {
    throttleRun.current!.cancel();
  });

  return {
    run: throttleRun.current,
    cancel: throttleRun.current.cancel,
    flush: throttleRun.current.flush
  };
}

export default useThrottleFn;
