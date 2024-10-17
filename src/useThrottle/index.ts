import { useState, useEffect } from 'react';
import useThrottleFn from '../useThrottleFn';

/**
 * 用来处理节流值的 Hook。
 *
 * @param {*} value 需要节流的值。
 * @param {number} [wait=0] 节流等待时间，单位为毫秒。默认 `0`。
 * @param {boolean} [immediate=true] 是否在延迟开始前调用。默认 `true`。
 * @returns
 * @example
 * const [value, setValue] = useState('');
 * // 频繁调用 setValue ， throttledValue 每隔 500ms 变化一次。
 * const throttledValue = useThrottle(value, 500);
 */
function useThrottle<ValueType = any>(value: ValueType, wait = 0, immediate = true) {
  const [state, setState] = useState(value);

  const { run } = useThrottleFn(setState, wait, immediate);

  useEffect(() => {
    run(value);
  }, [run, value]);

  return state;
}

export default useThrottle;
