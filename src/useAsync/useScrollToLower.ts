import { useEffect, useCallback } from 'react';
import usePersistFn from '../usePersistFn';
import { getScrollHeight, getClientHeight, getScrollTop } from '../utils/dom';

interface ScrollToLowerProps {
  ref?: React.RefObject<HTMLElement | Window>;
  threshold?: number;
  onScrollLower?: () => void;
}

const useScrollToLower = ({
  ref,
  threshold = 100,
  onScrollLower = () => {}
}: ScrollToLowerProps = {}) => {
  const onScrollLowerPersist = usePersistFn(onScrollLower);
  const scrollMethod = useCallback(() => {
    if (!ref?.current) {
      return;
    }
    if (
      getScrollHeight(ref.current) - getScrollTop(ref.current) <=
      getClientHeight(ref.current) + threshold
    ) {
      onScrollLowerPersist();
    }
  }, [onScrollLowerPersist, ref, threshold]);

  useEffect(() => {
    const target = ref?.current;

    if (target) {
      target.addEventListener('scroll', scrollMethod);

      return () => {
        target.removeEventListener('scroll', scrollMethod);
      };
    }
  }, [ref, scrollMethod]);
};

export default useScrollToLower;
