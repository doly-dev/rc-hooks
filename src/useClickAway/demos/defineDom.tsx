/**
 * desc: 支持传入dom对象或function返回dom对象
 */
import * as React from 'react';
import { useClickAway } from 'rc-hooks';

const Demo: React.FC = () => {
  const [count, setCount] = React.useState(0);

  useClickAway(
    () => document.querySelector('#box'),
    () => {
      setCount((c) => c + 1);
    }
  );

  return (
    <div>
      <span id="box">
        <button>box</button>
      </span>
      <p>count: {count}</p>
    </div>
  );
};

export default Demo;
