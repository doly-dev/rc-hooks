import { useState, useCallback } from 'react';
import useUnmountedRef from '../useUnmountedRef';

/**
 * 用法与 React.useState 完全一样，但是在组件卸载后 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏。
 *
 * @param {*} initialState 状态初始值。
 * @example
 * const [count, setCount] = useSafeState(0);
 * // 当组件卸载后，调用 `setCount` 不会触发。
 */
function useSafeState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
function useSafeState<S = undefined>(): [
  S | undefined,
  React.Dispatch<React.SetStateAction<S | undefined>>
];
function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);

  const setCurrentState = useCallback(
    (nextState: React.SetStateAction<S | undefined>) => {
      if (unmountedRef.current) {
        return;
      }
      setState(nextState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [state, setCurrentState];
}

export default useSafeState;
