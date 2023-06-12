import { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';

function useDebounce<ValueType = any>(
  value: ValueType,
  wait = 0,
  immediate = false
) {
  const [state, setState] = useState(value);
  const { run } = useDebounceFn(setState, wait, immediate);

  useEffect(() => {
    run(value);
  }, [run, value]);

  return state;
}

export default useDebounce;
