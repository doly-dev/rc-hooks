import * as React from 'react';

type SetState<S extends Record<string, any>> = <K extends keyof S>(state: S | Pick<S, K> | null | ((prevState: Readonly<S>) => S | Pick<S, K> | null)) => void;

function useSetState<S extends Record<string, any>>(initialValue: S | (() => S)) {
  const [state, setState] = React.useState<S>(initialValue);

  const set: SetState<S> = React.useCallback((nextState) => {
    setState((prevState) => {
      const newState = nextState instanceof Function ? nextState(prevState) : nextState;
      return newState instanceof Object ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, set] as const;
}

export default useSetState;
