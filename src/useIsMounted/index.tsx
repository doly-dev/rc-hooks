import { useRef, useEffect } from "react";

/**
 * @deprecated Please use `useUnmountedRef` or `useMountedRef`
 */
function useIsMounted() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    }
  }, []);

  return isMountedRef;
}

export default useIsMounted;