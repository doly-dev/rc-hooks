import { useState, useEffect } from "react";
import useDebounceFn from "../useDebounceFn";
import type { DebounceSettings } from "lodash";

function useDebounce<ValueType = any>(
  value: ValueType,
  wait = 0,
  options: DebounceSettings = {}
) {
  const [state, setState] = useState(value);
  const { run } = useDebounceFn(setState, wait, options);

  useEffect(() => {
    run(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return state;
}

export default useDebounce;
