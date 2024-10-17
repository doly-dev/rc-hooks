import { useCallback } from 'react';
import useSafeState from '../useSafeState';

/**
 * 强制组件重新渲染的 Hook。
 *
 * 内部使用了 `useSafeState`，调用时如果组件已经卸载则不会触发。
 * @returns
 * @example
 * const update = useUpdate();
 */
const useUpdate = () => {
  const [, setState] = useSafeState(0);
  const update = useCallback(() => {
    setState((num) => num + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return update;
};

export default useUpdate;
