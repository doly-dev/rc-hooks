import { useRef } from "react";

function useLatest<T = any>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

export default useLatest;