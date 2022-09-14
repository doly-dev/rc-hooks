import { useRef } from 'react';
import useMountedRef from '../useMountedRef';

export default function usePrevious<T>(state: T) {
  const mountedRef = useMountedRef();
  const prevRef = useRef<T>();
  const curRef = useRef(state);

  if (mountedRef.current && curRef.current !== state) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}
