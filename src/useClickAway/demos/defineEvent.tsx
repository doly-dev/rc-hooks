/**
 * title: 监听其他事件
 * desc: 试试点击右键
 */
import * as React from 'react';
import { useClickAway } from 'rc-hooks';

const Demo: React.FC = () => {
  const [count, setCount] = React.useState(0);

  useClickAway(
    () => document.querySelector('#box3'),
    () => {
      setCount((c) => c + 1);
    },
    'contextmenu'
  );

  return (
    <div>
      <span id="box3">
        <button>box</button>
      </span>
      <p>count: {count}</p>
    </div>
  );
};

export default Demo;
