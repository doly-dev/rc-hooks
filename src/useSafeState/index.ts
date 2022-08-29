import * as React from 'react';
import useUnmountedRef from '../useUnmountedRef';

function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = React.useState(initialState);

  const setCurrentState = React.useCallback(
    (nextState: S | (() => S)) => {
      if (unmountedRef.current) {
        return;
      }
      setState(nextState);
    },
    [unmountedRef]
  );

  return [state, setCurrentState] as const;
}

export default useSafeState;
