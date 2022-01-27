import { useRef } from 'react';
import debounce from 'lodash/debounce';
import useUnmount from '../useUnmount';

function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  options: Parameters<typeof debounce>[2] = {}
) {
  const refFn = useRef<T>(fn);
  refFn.current = fn;
  const debounceRun = useRef(debounce(((...args) => refFn.current(...args)) as T, wait, options));

  useUnmount(() => {
    debounceRun.current.cancel();
  });

  return {
    run: debounceRun.current,
    cancel: debounceRun.current.cancel,
    flush: debounceRun.current.flush
  };
}

export default useDebounceFn;
