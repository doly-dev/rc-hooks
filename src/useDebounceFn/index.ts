import { useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import type { DebounceSettings } from 'lodash';

function useDebounceFn<T extends (...args: any[]) => any>(fn: T, wait = 0, options: DebounceSettings = {}) {
  const refFn = useRef<T>(fn);
  refFn.current = fn;
  const debounceRun = useCallback(debounce(((...args) => refFn.current(...args)) as T, wait, options), []);

  useEffect(() => debounceRun.cancel, []);

  return {
    run: debounceRun,
    cancel: debounceRun.cancel,
  };
}

export default useDebounceFn;