import React from 'react';
import { TStorage } from 'cache2';
import Cookie from 'js-cookie';
import { useCacheState } from 'rc-hooks';

const cookieStorage: TStorage = {
  getItem(key: string) {
    return Cookie.get(key);
  },
  setItem(key: string, value: string) {
    Cookie.set(key, value);
  },
  removeItem(key: string) {
    Cookie.remove(key);
  }
  // 不支持 clearCacheState(cookieStorage) 清除全部，需要指定 key 清除。
  // clear() {}
};

const Demo: React.FC = () => {
  const [value, setValue] = useCacheState<any>('my-key', 'defaultValue', {
    storage: cookieStorage
  });

  return (
    <div>
      <p>value: {JSON.stringify(value)}</p>
      <p>type: {typeof value}</p>
      <div>
        setValue <button onClick={() => setValue('foo')}>foo</button>
        <button onClick={() => setValue('bar')}>bar</button>
        <button onClick={() => setValue(123)}>123</button>
        <button onClick={() => setValue(true)}>true</button>
        <button onClick={() => setValue([1, 2, 3])}>{JSON.stringify([1, 2, 3])}</button>
        <button onClick={() => setValue({ a: 1, b: 2 })}>{JSON.stringify({ a: 1, b: 2 })}</button>
      </div>
    </div>
  );
};

export default Demo;
