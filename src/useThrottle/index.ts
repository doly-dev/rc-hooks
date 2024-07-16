import { useState, useEffect } from 'react';
import useThrottleFn from '../useThrottleFn';

function useThrottle<ValueType = any>(value: ValueType, wait = 0, immediate = true) {
  const [state, setState] = useState(value);

  const { run } = useThrottleFn(setState, wait, immediate);

  useEffect(() => {
    run(value);
  }, [run, value]);

  return state;
}

export default useThrottle;
