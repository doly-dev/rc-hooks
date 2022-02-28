type CacheKey = string | number;

const cache: Record<
  CacheKey,
  {
    data: any;
    timer: NodeJS.Timeout;
    cacheTime: number;
    startTime: number;
  }
> = {};
const defaultCacheTime = 5 * 60 * 1000; // 默认缓存5分钟

const getCache = <T = any>(key: CacheKey) => {
  const currentCache = cache[key];

  if (!currentCache) {
    return;
  }

  const { startTime, cacheTime, data } = currentCache;
  const currentTime = new Date().getTime();

  if (currentTime - startTime >= cacheTime) {
    if (currentCache.timer) {
      clearTimeout(currentCache.timer);
      // @ts-ignore
      currentCache.timer = null;
      delete cache[key];
    }

    return;
  }

  return data as T;
};

const setCache = <T = any>(key: CacheKey, data: T, cacheTime = defaultCacheTime) => {
  if (cache[key]) {
    clearTimeout(cache[key].timer);
  }

  const timer = setTimeout(() => {
    delete cache[key];
  }, cacheTime);

  cache[key] = {
    data,
    timer,
    cacheTime,
    startTime: new Date().getTime()
  };
};

export { getCache, setCache };
