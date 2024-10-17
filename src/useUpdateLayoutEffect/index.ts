import { useLayoutEffect, useRef } from 'react';

/**
 * 只在依赖更新时执行的 useLayoutEffect Hook。
 *
 * @param {Function} effect 可执行函数。
 * @param {Array} [deps] 可选项，传入依赖变化的对象。
 * @example
 * const [count, setCount] = useState(0);
 *
 * useUpdateLayoutEffect(() => {
 *   // 初次加载不触发，再更新后触发
 *   // do something
 *
 *   return () => {
 *     // 卸载时触发
 *   };
 * }, [count]);
 */
const useUpdateLayoutEffect: typeof useLayoutEffect = (effect, deps) => {
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateLayoutEffect;
