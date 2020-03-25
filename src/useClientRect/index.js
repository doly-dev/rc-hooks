// ref: 
//  https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
import { useState, useCallback } from "react";

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

export default useClientRect;