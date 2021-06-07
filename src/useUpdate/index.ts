import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState(0);
  const update = useCallback(() => setState((num) => num + 1), []);
  return update;
};

export default useUpdate;
