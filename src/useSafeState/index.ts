import * as React from 'react';
import useUnmountedRef from '../useUnmountedRef';

function useSafeState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
function useSafeState<S = undefined>(): [S | undefined, React.Dispatch<React.SetStateAction<S | undefined>>];
function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = React.useState(initialState);

  const setCurrentState = React.useCallback(
    (nextState: React.SetStateAction<S | undefined>) => {
      if (unmountedRef.current) {
        return;
      }
      setState(nextState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return [state, setCurrentState];
}

export default useSafeState;
