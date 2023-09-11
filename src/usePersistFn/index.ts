// ref:
//  https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
import { useCallback } from 'react';
import useLatest from '../useLatest';

function usePersistFn<T extends (...args: any[]) => any>(fn: T): T extends infer R ? R : T {
  const ref = useLatest<T>(fn);

  const persistFn = useCallback(
    (...args: any[]) => {
      const refFn = ref.current;
      return refFn?.apply(void 0, args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return persistFn as any;
}

export default usePersistFn;
