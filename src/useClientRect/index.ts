// ref:
//  https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
import { useState, useRef, useEffect } from 'react';

/**
 * @deprecated Please use `useSize`
 */
function useClientRect() {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect>();

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current?.getBoundingClientRect());
    }
  }, [ref]);

  return [rect, ref] as const;
}

export default useClientRect;
