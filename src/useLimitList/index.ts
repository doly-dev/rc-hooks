import { useEffect, useMemo, useRef, useState } from 'react';
import { isArray } from 'ut2';

type Options = {
  count?: number;
  defaultLimited?: boolean;
};

/**
 * 管理列表展示数量的 Hook。
 *
 * @param {Array} list 列表数据。
 * @param {Object} [options] 配置项。
 * @param {number} [options.count=3] 默认限制列表数量。默认 `3`。
 * @param {boolean} [options.defaultLimited=true] 默认是否限制列表数据。默认 `true`。
 * @returns
 * @example
 * const { data, limited, canLimit, toggle } = useLimitList(list);
 */
function useLimitList<T>(list: T[] = [], options: Options = {}) {
  const { count = 3, defaultLimited = true } = options || {};
  const limitedRef = useRef(defaultLimited);

  const safeList = useMemo(() => (isArray(list) ? list : []), [list]);
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
    /**
     * 是否可以限制列表数量。当列表数量小于等于 `count` 时，为 `false`。
     */
    canLimit,

    /**
     * 当前是否限制列表数据。
     */
    limited: limitedRef.current,

    /**
     * 列表数据。
     */
    data,

    /**
     * 切换限制列表数据。
     */
    toggle
  };
}

export default useLimitList;
