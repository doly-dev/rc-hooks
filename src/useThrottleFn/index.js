import { useCallback, useEffect } from 'react';
import throttle from "lodash.throttle";

const noop = () => { };

function useThrottleFn(fn = noop, wait = 0, options = {}) {
  const throttleRun = useCallback(throttle(fn, wait, options), []);

  useEffect(() => throttleRun.cancel, []);

  return {
    run: throttleRun,
    cancel: throttleRun.cancel,
  };
}

export default useThrottleFn;