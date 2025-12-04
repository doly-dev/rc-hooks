/* eslint-disable react-hooks/refs */

import { useRef } from 'react';
import { debounce } from 'ut2';
import useUnmount from '../useUnmount';
import useLatest from '../useLatest';

/**
 * 用来处理防抖函数的 Hook。
 *
 * @param {Function} fn 需要防抖的函数。
 * @param {number} [wait=0] 防抖等待时间，单位为毫秒。默认 `0`。
 * @param {boolean} [immediate=false] 是否在延迟开始前调用。默认 `false`。
 * @returns
 * @example
 * const [value, setValue] = useState(0);
 * // 频繁调用 run，但只会在所有调用完成 500ms 后执行一次函数
 * const { run } = useDebounceFn(setValue, 500);
 */
function useDebounceFn<T extends (...args: any[]) => any>(fn: T, wait = 0, immediate = false) {
  const fnRef = useLatest<T>(fn);
  const debounceRun = useRef<ReturnType<typeof debounce>>(null);
  if (debounceRun.current === null) {
    // @ts-ignore
    debounceRun.current = debounce((...args) => fnRef.current.apply(void 0, args), wait, immediate);
  }

  useUnmount(() => {
    debounceRun.current!.cancel();
  });

  return {
    run: debounceRun.current,
    cancel: debounceRun.current.cancel,
    flush: debounceRun.current.flush
  };
}

export default useDebounceFn;
