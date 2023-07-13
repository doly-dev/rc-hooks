// ref:
//  https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
import { useCallback, useRef } from 'react';

function usePersistFn<T extends (...args: any[]) => any>(fn: T): T extends infer R ? R : T {
  const ref = useRef<T>(fn);

  ref.current = fn;

  const persistFn = useCallback(
    (...args: any[]) => {
      const refFn = ref.current;
      return refFn?.apply(void 0, args);
    },
    [ref]
  );

  return persistFn as any;
}

export default usePersistFn;
