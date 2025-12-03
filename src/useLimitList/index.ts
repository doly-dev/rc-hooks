import { useMemo, useState } from 'react';
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
function useLimitList<T>(list: T[] | undefined, options: Options = {}) {
  const { count = 3, defaultLimited = true } = options || {};
  const [limited, setLimited] = useState(defaultLimited);

  const data = useMemo(() => {
    if (isArray(list) && list.length > count) {
      return limited ? list.slice(0, count) : list;
    }
    return list || [];
  }, [limited, list, count]);

  const toggle = () => {
    setLimited(!limited);
  };

  return {
    /**
     * 当前是否限制列表数据。
     */
    limited,

    /**
     * 是否可以限制列表数量。当列表数量小于等于 `count` 时，为 `false`。
     */
    canLimit: isArray(list) && list.length > count,

    /**
     * 限制列表后的数据。
     */
    data,

    /**
     * 切换限制列表数据。
     */
    toggle
  };
}

export default useLimitList;
