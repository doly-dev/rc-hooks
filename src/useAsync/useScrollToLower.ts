import { useEffect, useCallback } from 'react';
import usePersistFn from '../usePersistFn';
import { getScrollHeight, getClientHeight, getScrollTop } from '../utils/dom';

type ScrollElement = HTMLElement | Window | null | undefined;

export type TargetType = ScrollElement | (() => ScrollElement);

function getTarget(target: TargetType) {
  if (typeof target === 'function') {
    // @ts-ignore
    return target();
  }
  return target;
}

interface ScrollToLowerProps {
  target?: TargetType;
  threshold?: number;
  onScrollLower?: () => void;
}

const useScrollToLower = ({
  target: outTarget,
  threshold = 100,
  onScrollLower = () => { }
}: ScrollToLowerProps = {}) => {
  const onScrollLowerPersist = usePersistFn(onScrollLower);
  const scrollMethod = useCallback(() => {
    if (!outTarget) {
      return;
    }
    const target = getTarget(outTarget);
    if (!target) {
      return;
    }
    if (getScrollHeight(target) - getScrollTop(target) <= getClientHeight(target) + threshold) {
      onScrollLowerPersist();
    }
  }, [onScrollLowerPersist, outTarget, threshold]);

  useEffect(() => {
    if (outTarget) {
      const target = getTarget(outTarget);
      if (target) {
        target.addEventListener('scroll', scrollMethod);

        return () => {
          target.removeEventListener('scroll', scrollMethod);
        };
      }
    }
  }, [outTarget, scrollMethod]);
};

export default useScrollToLower;
