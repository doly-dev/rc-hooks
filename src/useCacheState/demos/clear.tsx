import React from 'react';
import { clearCacheState, useCacheState } from 'rc-hooks';

const Demo: React.FC = () => {
  const [value1, setValue1] = useCacheState<any>('ck-1', 'defaultValue111', {
    storage: localStorage
  });
  const [value2, setValue2] = useCacheState<any>('ck-2', 'defaultValue222', {
    storage: localStorage
  });
  const [value3, setValue3] = useCacheState<any>('ck-3', 'defaultValue333', {
    storage: localStorage
  });

  return (
    <div>
      <h3>key: ck-1</h3>
      <p>value: {JSON.stringify(value1)}</p>
      <p>type: {typeof value1}</p>
      <div>
        setValue <button onClick={() => setValue1('foo')}>foo</button>
        <button onClick={() => setValue1('bar')}>bar</button>
        <button onClick={() => setValue1(123)}>123</button>
        <button onClick={() => setValue1(true)}>true</button>
        <button onClick={() => setValue1([1, 2, 3])}>{JSON.stringify([1, 2, 3])}</button>
        <button onClick={() => setValue1({ a: 1, b: 2 })}>{JSON.stringify({ a: 1, b: 2 })}</button>
      </div>
      <h3>key: ck-2</h3>
      <p>value: {JSON.stringify(value2)}</p>
      <p>type: {typeof value2}</p>
      <div>
        setValue <button onClick={() => setValue2('foo')}>foo</button>
        <button onClick={() => setValue2('bar')}>bar</button>
        <button onClick={() => setValue2(123)}>123</button>
        <button onClick={() => setValue2(true)}>true</button>
        <button onClick={() => setValue2([1, 2, 3])}>{JSON.stringify([1, 2, 3])}</button>
        <button onClick={() => setValue2({ a: 1, b: 2 })}>{JSON.stringify({ a: 1, b: 2 })}</button>
      </div>
      <h3>key: ck-3</h3>
      <p>value: {JSON.stringify(value3)}</p>
      <p>type: {typeof value3}</p>
      <div>
        setValue <button onClick={() => setValue3('foo')}>foo</button>
        <button onClick={() => setValue3('bar')}>bar</button>
        <button onClick={() => setValue3(123)}>123</button>
        <button onClick={() => setValue3(true)}>true</button>
        <button onClick={() => setValue3([1, 2, 3])}>{JSON.stringify([1, 2, 3])}</button>
        <button onClick={() => setValue3({ a: 1, b: 2 })}>{JSON.stringify({ a: 1, b: 2 })}</button>
      </div>
      <h3>clearCacheState</h3>
      <div>
        <button onClick={() => clearCacheState(localStorage, 'ck-1')}>clear ck-1</button>
        <button onClick={() => clearCacheState(localStorage, 'ck-2')}>clear ck-2</button>
        <button onClick={() => clearCacheState(localStorage, 'ck-3')}>clear ck-3</button>
        <button onClick={() => clearCacheState(localStorage, ['ck-1', 'ck-2'])}>
          clear ck-1,ck-2
        </button>
        <button onClick={() => clearCacheState(localStorage, ['ck-2', 'ck-3'])}>
          clear ck-2,ck-3
        </button>
        <button onClick={() => clearCacheState(localStorage)}>clear All</button>
      </div>
      <p>点击清除缓存后，请刷新页面查看效果。</p>
    </div>
  );
};

export default Demo;
