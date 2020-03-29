import { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';

function useDebounce(value, wait = 0, options = {}) {
  const [state, setState] = useState(value);
  const { run } = useDebounceFn(setState, wait, options);

  useEffect(() => {
    run(value);
  }, [value]);

  return state;
}

export default useDebounce;