import { useCallback } from 'react';
import useLatest from '../useLatest';

/**
 * 持久化 function 的 Hook。
 *
 * @see {@link https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback | 如何从 useCallback 读取一个经常变化的值？}
 * @param fn 需要持久化的函数。
 * @returns 引用地址永远不会变化的 `fn`。
 * @example
 * const [text, updateText] = useState('');
 *
 * // 该函数不会变化
 * const handleSubmit = usePersistFn(() => {
 *   // 可以获取到最新的 state
 *   alert(text);
 * });
 */
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
