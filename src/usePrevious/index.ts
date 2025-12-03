/* eslint-disable react-hooks/refs */
import { useRef } from 'react';
import useMountedRef from '../useMountedRef';

/**
 * 返回上一次的 state 或 props 。
 *
 * @param state 需要记录变化的值。
 * @returns 上一次记录的值。
 * @example
 * const [value, setValue] = useState('');
 * // 上一次 state 的值。
 * const prevValue = usePrevious(value);
 */
function usePrevious<T>(state: T) {
  const mountedRef = useMountedRef();
  const prevRef = useRef<T>(undefined);
  const curRef = useRef(state);

  if (mountedRef.current && curRef.current !== state) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}

export default usePrevious;
