import { useState, useEffect } from "react";
import useThrottleFn from "../useThrottleFn";
import type { ThrottleSettings } from "lodash";

function useThrottle<ValueType = any>(
  value: ValueType,
  wait = 0,
  options: ThrottleSettings = {}
) {
  const [state, setState] = useState(value);

  const { run } = useThrottleFn(setState, wait, options);

  useEffect(() => {
    run(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return state;
}

export default useThrottle;
