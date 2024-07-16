import { useCallback } from 'react';
import useSafeState from '../useSafeState';

const useUpdate = () => {
  const [, setState] = useSafeState(0);
  const update = useCallback(() => {
    setState((num) => num + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return update;
};

export default useUpdate;
