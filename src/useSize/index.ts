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
  const [size, setSize] = useState<{ width?: number; height?: number }>(() => {
    const target = getRef(ref);
    return {
      width: target?.clientWidth,
      height: target?.clientHeight
    };
  });
  const sizeLatestRef = useLatest(size);

  useEffect(() => {
    const target = getRef(latestRef.current);

    function refresh(el: HTMLElement | null) {
      const width = el?.clientWidth;
      const height = el?.clientHeight;
      if (width !== sizeLatestRef.current.width || height !== sizeLatestRef.current.height) {
        setSize({
          width,
          height
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
  }, [latestRef, sizeLatestRef]);

  return size;
}

export default useSize;
