import Cache2 from 'cache2';

const memoryCache = new Cache2({ stdTTL: 5 * 60 * 1000 });

const getCache = <T = any>(key: string) => {
  return memoryCache.get(key) as T;
};

const setCache = <T = any>(key: string, data: T, cacheTime?: number) => {
  memoryCache.set(key, data, cacheTime);
};

const clearCache = (key?: string | string[]) => {
  if (key) {
    memoryCache.del(key);
  } else {
    memoryCache.clear();
  }
};

export { getCache, setCache, clearCache };
