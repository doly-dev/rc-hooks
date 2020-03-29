import { useCallback, useEffect } from 'react';
import debounce from "lodash.debounce";

const noop = () => { };

function useDebounceFn(fn = noop, wait = 0, options = {}) {
  const debounceRun = useCallback(debounce(fn, wait, options), []);

  useEffect(() => debounceRun.cancel, []);

  return {
    run: debounceRun,
    cancel: debounceRun.cancel,
  };
}

export default useDebounceFn;