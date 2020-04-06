import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState(0);

  return useCallback(() => setState((num) => num + 1), []);
};

export default useUpdate;
