import { useCallback, useEffect, useRef } from 'react';
import throttle from 'lodash.throttle';
import type { ThrottleSettings } from 'lodash';

function useThrottleFn<T extends (...args: any[]) => any>(fn: T, wait = 0, options: ThrottleSettings = {}) {
  const refFn = useRef<T>(fn);
  refFn.current = fn;
  const throttleRun = useCallback(throttle(((...args) => refFn.current(...args)) as T, wait, options), []);
  useEffect(() => throttleRun.cancel, []);

  return {
    run: throttleRun,
    cancel: throttleRun.cancel,
  };
}

export default useThrottleFn;