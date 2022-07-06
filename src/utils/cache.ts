type CacheContent = {
  data: any;
  timer: NodeJS.Timeout;
  cacheTime: number;
  startTime: number;
};

const cache: Record<string, CacheContent> = {};
const defaultCacheTime = 5 * 60 * 1000; // 默认缓存5分钟

const getCache = <T = any>(key: string) => {
  const currentCache = cache[key];

  if (!currentCache) {
    return;
  }

  const { startTime, cacheTime, data } = currentCache;
  const currentTime = new Date().getTime();

  if (currentTime - startTime >= cacheTime) {
    if (currentCache.timer) {
      clearTimeout(currentCache.timer);
    }
    delete cache[key];
    return;
  }

  return data as T;
};

const setCache = <T = any>(key: string, data: T, cacheTime = defaultCacheTime) => {
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

const clearCache = (key?: string | string[]) => {
  let keys: string[] = [];
  if (typeof key === 'undefined') {
    keys = Object.keys(cache);
  } else {
    keys = Array.isArray(key) ? key : [key];
  }

  keys.forEach((k) => {
    if (cache[k]) {
      if (cache[k].timer) {
        clearTimeout(cache[k].timer);
      }
      delete cache[k];
    }
  });
};

export { getCache, setCache, clearCache };
