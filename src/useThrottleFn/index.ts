import { useCallback, useEffect } from 'react';
import throttle from "lodash.throttle";

function useThrottleFn<T extends (...args: any[]) => any>(fn: T, wait = 0, options = {}) {
  const throttleRun = useCallback(throttle<T>(fn, wait, options), []);

  useEffect(() => throttleRun.cancel, []);

  return {
    run: throttleRun,
    cancel: throttleRun.cancel,
  };
}

export default useThrottleFn;