import { useEffect, useCallback } from 'react';

interface ScrollToLowerOptions {
  ref?: React.RefObject<HTMLElement | any> | null;
  threshold?: number;
  ready?: boolean;
  onLoad?: () => void;
}

type UseScrollToBottomLoad = (options?: ScrollToLowerOptions) => void;

const useScrollToLower: UseScrollToBottomLoad = ({
  ref,
  threshold = 100,
  ready = false,
  onLoad = () => { }
}) => {
  const scrollMethod = useCallback(() => {
    if (!ready) {
      return;
    }
    if (ref.current.scrollHeight - ref.current.scrollTop <= ref.current.clientHeight + threshold) {
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