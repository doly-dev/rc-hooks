import { useState, useEffect } from 'react';
import ResizeObserver from './ResizeObserver';
import getRef, { RefType } from '../utils/getRef';
import useLatest from '../useLatest';

/**
 * 获取并监听 dom 节点的宽高。
 *
 * @param {Object} ref `dom` 节点引用。
 * @returns {Object} 返回 `dom` 节点的宽高。
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const size = useSize(ref);
 *
 * return (
 *   <>
 *     <h1 ref={ref}>Hello, world</h1>
 *     <p>rect value: {JSON.stringify(size)}</p>
 *   </>
 * );
 */
function useSize<T extends HTMLElement = HTMLElement>(ref: RefType<T>) {
  const latestRef = useLatest(ref);
  const refIsFunc = typeof ref === 'function';
  const wrapperRef = refIsFunc ? latestRef : ref;
  const [size, setSize] = useState<{ width?: number; height?: number }>(() => {
    const target = getRef(ref);
    return {
      width: target?.clientWidth,
      height: target?.clientHeight
    };
  });

  useEffect(() => {
    const target = getRef(refIsFunc ? (wrapperRef as any).current : wrapperRef);

    function refresh(el: HTMLElement | null) {
      if (el) {
        setSize({
          width: el.clientWidth,
          height: el.clientHeight
        });
      }
    }

    if (!target) {
      return () => {};
    }

    refresh(target);

    const observer = new ResizeObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
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
