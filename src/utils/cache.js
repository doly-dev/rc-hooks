const cache = {};
const defaultCacheTime = 5 * 60 * 1000; // 默认缓存5分钟

const getCache = (key) => {
  return cache[key] ? cache[key].data : undefined;
}

const setCache = (key, data, cacheTime = defaultCacheTime) => {
  if (cache[key]) {
    clearTimeout(cache[key].timer);
  }

  const timer = setTimeout(() => {
    delete cache[key];
  }, cacheTime);

  cache[key] = {
    data,
    timer
  };
}

export {
  getCache,
  setCache
}