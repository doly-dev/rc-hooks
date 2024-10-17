import { useState, useCallback } from 'react';

type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: S | Pick<S, K> | null | ((prevState: Readonly<S>) => S | Pick<S, K> | null)
) => void;

/**
 * 管理 object 类型 state 的 Hook ，用法和 class 组件的 `this.setState` 基本一致，内部使用展开操作符进行合并。
 *
 * @param {Object} initialValue 初始值。
 * @returns
 * @example
 * const [state, setState] = useSetState({
 *   foo: 0,
 *   count: 0,
 *   bar: undefined as string | undefined
 * });
 *
 * // 单独更新某个状态，不影响其他状态值
 * setState({
 *   foo: 1
 * });
 *
 * useEffect(()=>{
 *   console.log(state);
 *   // { foo: 1, count: 0, bar: undefined }
 * }, [state]);
 */
function useSetState<S extends Record<string, any>>(initialValue: S | (() => S)) {
  const [state, setState] = useState<S>(initialValue);

  const set: SetState<S> = useCallback((nextState) => {
    setState((prevState) => {
      const newState = nextState instanceof Function ? nextState(prevState) : nextState;
      return newState instanceof Object ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, set] as const;
}

export default useSetState;
