import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Options = {
  count?: number;
  defaultLimited?: boolean;
};

function useLimitList<T extends any[] = any[]>(
  list: T,
  options?: Options
): {
  canLimit: boolean;
  limited: boolean;
  data: T extends (infer R)[] ? R[] : any[];
  toggle: () => void;
};
function useLimitList(list: any[], options: Options = {}) {
  const { count = 3, defaultLimited = true } = options || {};

  const safeList = useRef(list);
  safeList.current = Array.isArray(list) ? list : [];
  const safeCount = useMemo(() => (count < 0 ? 0 : Math.ceil(count)), [count]);

  // 是否可以限制数量
  const canLimit = safeList.current.length > safeCount;

  // 限制后的值
  const [data, setData] = useState(() => {
    if (canLimit && defaultLimited) {
      return safeList.current.slice(0, safeCount);
    }
    return safeList.current;
  });

  // 是否限制数量
  const limited = canLimit && data.length !== safeList.current.length;

  // 切换限制/不限制数量
  const toggle = useCallback(() => {
    setData(limited ? safeList.current : safeList.current.slice(0, safeCount));
  }, [safeCount, limited]);

  // 修改list 或 safeCount后，触发更新
  useEffect(() => {
    setData(limited ? safeList.current.slice(0, safeCount) : safeList.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeCount, list]);

  return {
    canLimit,
    limited,
    data,
    toggle
  };
}

export default useLimitList;
