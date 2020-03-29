const memoryData = {};
const memoryStorage = {
  // eslint-disable-next-line
  getItem: function(key) {
    return memoryData[key];
  },
  // eslint-disable-next-line
  setItem: function(key, data) {
    memoryData[key] = data;
  },
  // eslint-disable-next-line
  removeItem: function(key) {
    const ret = memoryData[key];
    delete memoryData[key];
    return ret;
  }
};

const setStorage = storage => {
  try {
    if (storage.getItem && storage.setItem && storage.removeItem) {
      return storage;
    }
    return window.localStorage;
  } catch (err) {
    // eslint-disable-next-line
    console.warn(err);
    if (typeof window !== "undefined") {
      return window.localStorage;
    }
  }
  return memoryStorage;
};

class Storage {
  constructor(key, storage) {
    this.key = key;
    this.storage = setStorage(storage);
  }

  set(data) {
    this.storage.setItem(this.key, JSON.stringify(data));
  }

  get() {
    return JSON.parse(this.storage.getItem(this.key));
  }

  remove() {
    this.storage.removeItem(this.key);
  }
}

export default Storage;
