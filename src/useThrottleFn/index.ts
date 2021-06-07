import { useCallback, useEffect } from 'react';
import throttle from 'lodash.throttle';
import type { ThrottleSettings } from 'lodash';

function useThrottleFn<T extends (...args: any[]) => any>(fn: T, wait = 0, options: ThrottleSettings = {}) {
  const throttleRun = useCallback(throttle<T>(fn, wait, options), []);

  useEffect(() => throttleRun.cancel, []);

  return {
    run: throttleRun,
    cancel: throttleRun.cancel,
  };
}

export default useThrottleFn;