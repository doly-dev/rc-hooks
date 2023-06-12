import { useRef } from 'react';
import { throttle } from 'ut2';
import useUnmount from '../useUnmount';

function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  immediate = true
) {
  const refFn = useRef<T>(fn);
  refFn.current = fn;
  const throttleRun = useRef(throttle(((...args) => refFn.current(...args)), wait, immediate));

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
