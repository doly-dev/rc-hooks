import { useEffect, useCallback } from "react";

interface ScrollToLowerProps {
  ref?: React.RefObject<HTMLElement>;
  threshold?: number;
  ready?: boolean;
  onLoad?: () => void;
}

const useScrollToLower = ({
  ref,
  threshold = 100,
  ready = false,
  onLoad = () => { },
}: ScrollToLowerProps = {}) => {
  const scrollMethod = useCallback(() => {
    if (!ready) {
      return;
    }
    if (
      ref?.current?.scrollHeight &&
      ref?.current?.scrollTop &&
      ref?.current?.clientHeight &&
      ref.current.scrollHeight - ref.current.scrollTop <=
      ref.current.clientHeight + threshold
    ) {
      onLoad();
    }
  }, [onLoad, ready, ref, threshold]);

  useEffect(() => {
    if (!ref || !ref.current) {
      return () => { };
    }
    const target = ref.current;

    target.addEventListener("scroll", scrollMethod);

    return () => {
      if (target) {
        target.removeEventListener("scroll", scrollMethod);
      }
    };
  }, [ref, scrollMethod]);
};

export default useScrollToLower;
