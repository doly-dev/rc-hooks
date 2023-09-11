import { useRef } from 'react';
import { debounce } from 'ut2';
import useUnmount from '../useUnmount';
import useLatest from '../useLatest';

function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  wait = 0,
  immediate = false
) {
  const fnRef = useLatest<T>(fn);
  const debounceRun = useRef(debounce(((...args) => fnRef.current.apply(void 0, args)), wait, immediate));

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
