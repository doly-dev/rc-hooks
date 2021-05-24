import { useState, useEffect } from 'react';
import useThrottleFn from '../useThrottleFn';

function useThrottle<ValueType = any>(value: ValueType, wait = 0, options = {}) {
  const [state, setState] = useState(value);

  const { run } = useThrottleFn(setState, wait, options);

  useEffect(() => {
    run(value);
  }, [value]);

  return state;
}

export default useThrottle;