import { useEffect, useMemo, useRef, useState } from 'react';

type Options = {
  count?: number;
  defaultLimited?: boolean;
};

function useLimitList(list: any[] = [], options: Options = {}) {
  const { count = 3, defaultLimited = true } = options || {};
  const limitedRef = useRef(defaultLimited);

  const safeList = useMemo(() => (Array.isArray(list) ? list : []), [list]);
  const safeCount = useMemo(() => (count > 0 ? Math.ceil(count) : 0), [count]);

  // 是否可以限制数量
  const canLimit = useMemo(() => safeList.length > safeCount, [safeCount, safeList.length]);

  // 限制后的值
  const [data, setData] = useState(() => {
    if (canLimit && defaultLimited) {
      return safeList.slice(0, safeCount);
    }
    return safeList;
  });

  // 切换限制/不限制数量
  const toggle = () => {
    if (canLimit) {
      limitedRef.current = !limitedRef.current;
    }
    setData(limitedRef.current ? safeList.slice(0, safeCount) : safeList);
  };

  // 修改 list 或 count 后，触发更新
  useEffect(() => {
    setData(limitedRef.current ? safeList.slice(0, safeCount) : safeList);
  }, [safeCount, safeList]);

  return {
    canLimit,
    limited: limitedRef.current,
    data,
    toggle
  };
}

export default useLimitList;
