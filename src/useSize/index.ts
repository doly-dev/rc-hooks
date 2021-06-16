import { useState, useEffect, MutableRefObject, useCallback } from 'react';
import ResizeObserver from './ResizeObserver';
import getRef from '../utils/getRef';

function useSize(targetNode: MutableRefObject<HTMLElement>) {
  const [size, setSize] = useState<{ width?: number; height?: number; }>(() => {
    const target = getRef(targetNode);
    return {
      width: (target || {}).clientWidth,
      height: (target || {}).clientHeight
    }
  });

  const refresh = useCallback((target?: HTMLElement | null) => {
    if (target) {
      setSize({
        width: target.clientWidth,
        height: target.clientHeight
      });
    }
  }, []);

  useEffect(() => {
    const target = getRef(targetNode);

    if (!target) {
      return () => { }
    }

    refresh(target);

    const observer = new ResizeObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        refresh(mutation.target);
      }
    });

    observer.observe(targetNode.current);

    return () => {
      observer.disconnect();
    }
  }, [targetNode]);

  return size;
}

export default useSize;