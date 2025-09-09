import { useCallback, useMemo, useState } from 'react';
import { isUndefined } from 'ut2';
import { Cache, TStorage } from 'cache2';
import { pkgName } from '../utils/config';

const cacheNamespace = pkgName + '_useCacheState';

/**
 * 获取 `useCacheState` 缓存实例。
 *
 * @see {@link https://github.com/caijf/cache2 | cache2}
 * @param storage 自定义数据存储器，支持 `localStorage` `sessionStorage`。默认使用内存缓存。
 * @returns 缓存实例。
 */
function getCache(storage?: TStorage) {
  return new Cache(cacheNamespace, {
    storage
  });
}

/**
 * 清理 `useCacheState` 缓存。如果不传 `key`，表示清理全部。
 *
 * @see {@link https://github.com/caijf/cache2 | cache2}
 * @param storage 自定义数据存储器，支持 `localStorage` `sessionStorage`。默认使用内存缓存。
 * @param key 键名称。
 */
export function clearCacheState(storage?: TStorage, key?: string | string[]) {
  const cache = getCache(storage);
  if (key) {
    cache.del(key);
  } else {
    cache.clear();
  }
}

/**
 * 缓存状态。
 *
 * @param key 键名称。
 * @param defaultValue 默认值。
 * @param options 选项。
 * @param options.ttl 过期时间，单位毫秒。默认不过期。
 * @param options.storage 自定义数据存储器，支持 `localStorage` `sessionStorage`。默认使用内存缓存。
 * @returns 状态值和更新状态值的函数。
 */
function useCacheState<T>(
  key: string,
  defaultValue?: T,
  options: {
    ttl?: number;
    storage?: TStorage;
  } = {}
) {
  const { ttl, storage } = options;
  const cache = useMemo(() => getCache(storage), [storage]);
  const [state, setState] = useState<T>(() => {
    const cachedValue = cache.get(key);
    return isUndefined(cachedValue) ? defaultValue : cachedValue;
  });

  const set: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (nextState) => {
      setState((prevState) => {
        const newState = nextState instanceof Function ? nextState(prevState) : nextState;
        cache.set(key, newState, ttl);
        return newState;
      });
    },
    [cache, key, ttl]
  );

  return [state, set] as const;
}

export default useCacheState;
