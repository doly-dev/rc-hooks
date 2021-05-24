import { useEffect, useCallback } from 'react';

interface ScrollToLowerProps {
  ref?: React.RefObject<HTMLElement | null> | null;
  threshold?: number;
  ready?: boolean;
  onLoad?: () => void;
}

const useScrollToLower = ({
  ref,
  threshold = 100,
  ready = false,
  onLoad = () => { }
}: ScrollToLowerProps = {}) => {
  const scrollMethod = useCallback(() => {
    if (!ready) {
      return;
    }
    if (
      (ref?.current?.scrollHeight && ref?.current?.scrollTop && ref?.current?.clientHeight) &&
      ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + threshold
    ) {
      onLoad();
    }
  }, [ready, ref]);

  useEffect(() => {
    if (!ref || !ref.current) {
      return () => { };
    }

    ref.current.addEventListener('scroll', scrollMethod);
    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener('scroll', scrollMethod);
      }
    };
  }, [scrollMethod]);
}

export default useScrollToLower;