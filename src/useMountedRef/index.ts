import { useRef, useEffect } from 'react';

/**
 * 用于异步回调 或 dom 操作判断当前组件是否装载。
 *
 * 如果组件装载再去更新状态或操作，避免因组件卸载后更新状态而导致的内存泄漏。
 *
 * @returns 返回一个 `ref`。如果组件装载完成，值为 `true`。如果组件未装载完成或卸载，值为 `false`。
 * @example
 * const mountedRef = useMountedRef();
 */
const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};

export default useMountedRef;
