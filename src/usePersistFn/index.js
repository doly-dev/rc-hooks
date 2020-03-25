// ref:
//  https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
//  https://hooks.umijs.org/zh-CN/hooks/advanced/use-persist-fn
import { useCallback, useRef } from 'react';

const noop = () => { };

function usePersistFn(fn = noop) {
  const ref = useRef(() => {
    throw new Error('Cannot call function while rendering.');
  });

  ref.current = fn;

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}

export default usePersistFn;