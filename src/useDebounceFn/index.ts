import { useCallback, useEffect } from 'react';
import debounce from "lodash.debounce";
import type { DebounceSettings } from 'lodash';

function useDebounceFn<T extends (...args: any[]) => any>(fn: T, wait = 0, options: DebounceSettings = {}) {
  const debounceRun = useCallback(debounce<T>(fn, wait, options), []);

  useEffect(() => debounceRun.cancel, []);

  return {
    run: debounceRun,
    cancel: debounceRun.cancel,
  };
}

export default useDebounceFn;