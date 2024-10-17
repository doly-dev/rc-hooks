import { useEffect } from 'react';
import useLatest from '../useLatest';

/**
 * 只在组件 `unmount` 时执行的 Hook。
 *
 * @param fn 组件 `unmount` 时执行的函数。
 * @example
 * useUnmount(() => {
 *   console.log('unmount');
 * });
 */
const useUnmount = (fn: () => any) => {
  const fnRef = useLatest(fn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => fnRef.current(), []);
};

export default useUnmount;
