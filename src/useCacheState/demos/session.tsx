import React from 'react';
import { useCacheState } from 'rc-hooks';

const Demo: React.FC = () => {
  const [value, setValue] = useCacheState<any>('my-key', 'defaultValue', {
    storage: sessionStorage
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
