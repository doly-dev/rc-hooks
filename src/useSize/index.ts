import { useState, useEffect } from 'react';
import ResizeObserver from './ResizeObserver';
import getRef, { RefType } from '../utils/getRef';
import useLatest from '../useLatest';

function useSize<T extends HTMLElement = HTMLElement>(ref: RefType<T>) {
  const latestRef = useLatest(ref);
  const refIsFunc = typeof ref === 'function';
  const wrapperRef = refIsFunc ? latestRef : ref;
  const [size, setSize] = useState<{ width?: number; height?: number }>(() => {
    const target = getRef(ref);
    return {
      width: (target || {}).clientWidth,
      height: (target || {}).clientHeight
    };
  });

  useEffect(() => {
    const target = getRef(refIsFunc ? (wrapperRef as any).current : wrapperRef);

    function refresh(target: HTMLElement | null) {
      if (target) {
        setSize({
          width: target.clientWidth,
          height: target.clientHeight
        });
      }
    }

    if (!target) {
      return () => { };
    }

    refresh(target);

    const observer = new ResizeObserver((mutationsList) => {
      mutationsList.forEach(mutation => {
        refresh(mutation.target);
      });
    });

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [wrapperRef, refIsFunc]);

  return size;
}

export default useSize;
