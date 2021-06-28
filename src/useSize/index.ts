import { useState, useEffect, useCallback } from 'react';
import ResizeObserver from './ResizeObserver';
import getRef from '../utils/getRef';
import type { RefType } from '../utils/getRef';

function useSize<T extends HTMLElement = HTMLElement>(targetNode: RefType<T>) {
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

    observer.observe(target);

    return () => {
      observer.disconnect();
    }
  }, [targetNode]);

  return size;
}

export default useSize;