import { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';

/**
 * 用来处理防抖值的 Hook。
 *
 * @param {*} value 需要防抖的值。
 * @param {number} [wait=0] 防抖等待时间，单位为毫秒。默认 `0`。
 * @param {boolean} [immediate=false] 是否在延迟开始前调用。默认 `false`。
 * @returns
 * @example
 * const [value, setValue] = useState('');
 * // 在 value 修改结束 500ms 后变化。
 * const debouncedValue = useDebounce(value, 500);
 */
function useDebounce<ValueType = any>(value: ValueType, wait = 0, immediate = false) {
  const [state, setState] = useState(value);
  const { run } = useDebounceFn(setState, wait, immediate);

  useEffect(() => {
    run(value);
  }, [run, value]);

  return state;
}

export default useDebounce;
