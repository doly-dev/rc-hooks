// ref:
//  https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
import { useRef, useEffect } from 'react';

export default function usePrevious<T>(state: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = state;
  });
  return ref.current;
}