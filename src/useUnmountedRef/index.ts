import { useRef, useEffect } from 'react';

/**
 * 用于异步回调中判断当前组件是否卸载。
 *
 * 如果组件卸载就不更新状态，避免因组件卸载后更新状态而导致的内存泄漏。
 *
 * @returns 返回一个 `ref`。如果组件卸载，值为 `true`，否则值为 `false`。
 * @example
 * const unmountedRef = useUnmountedRef();
 */
const useUnmountedRef = () => {
  const unmountedRef = useRef(false);

  useEffect(() => {
    unmountedRef.current = false;

    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return unmountedRef;
};

export default useUnmountedRef;
