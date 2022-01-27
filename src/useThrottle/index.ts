import { useState, useEffect } from 'react';
import useThrottleFn from '../useThrottleFn';

function useThrottle<ValueType = any>(
  value: ValueType,
  wait = 0,
  options: Parameters<typeof useThrottleFn>[2] = {}
) {
  const [state, setState] = useState(value);

  const { run } = useThrottleFn(setState, wait, options);

  useEffect(() => {
    run(value);
  }, [run, value]);

  return state;
}

export default useThrottle;
