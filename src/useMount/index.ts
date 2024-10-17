import { useEffect } from 'react';

/**
 * 只在组件 mount 时执行的 Hook。
 *
 * @param {Function} fn 组件 `mount` 时执行的函数。
 * @example
 * useMount(() => {
 *   console.log('mount');
 * });
 */
const useMount = (fn: () => void) => {
  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
