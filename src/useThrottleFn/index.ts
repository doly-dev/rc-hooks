import { useRef } from 'react';
import throttle from 'lodash.throttle';
import type { ThrottleSettings } from 'lodash';
import useUnmount from '../useUnmount';

function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  options: ThrottleSettings = {}
) {
  const refFn = useRef<T>(fn);
  refFn.current = fn;
  const throttleRun = useRef(throttle(((...args) => refFn.current(...args)) as T, wait, options));

  useUnmount(() => {
    throttleRun.current.cancel();
  });

  return {
    run: throttleRun.current,
    cancel: throttleRun.current.cancel,
    flush: throttleRun.current.flush
  };
}

export default useThrottleFn;
