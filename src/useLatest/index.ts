import { useRef } from 'react';

/**
 * 返回最新的 state 或 props 。
 *
 * @param value state 或 props 的值。
 * @returns
 * @example
 * const [count, setCount] = React.useState(0);
 * // 最新的 count 值。可以在其他 hook 中使用，而不需要依赖它触发更新。
 * const latestCount = useLatest(count);
 */
function useLatest<T = any>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

export default useLatest;
