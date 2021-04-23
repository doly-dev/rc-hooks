// ref: 
//  https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
import { useState, useRef, useEffect } from "react";

function useClientRect() {
  const ref = useRef(null);
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  return [rect, ref];
}

export default useClientRect;