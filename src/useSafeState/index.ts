import * as React from 'react';
import useUnmountedRef from '../useUnmountedRef';

function useSafeState<S>(initialState: S | (() => S)): [S, React.Dispatch<React.SetStateAction<S>>];
function useSafeState<S = undefined>(): [
  S | undefined,
  React.Dispatch<React.SetStateAction<S | undefined>>
];

function useSafeState(initialState?: any) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = React.useState(initialState);

  const setCurrentState = React.useCallback(
    (s: any) => {
      if (unmountedRef.current) {
        return;
      }
      setState(s);
    },
    [unmountedRef]
  );

  return [state, setCurrentState];
}

export default useSafeState;
