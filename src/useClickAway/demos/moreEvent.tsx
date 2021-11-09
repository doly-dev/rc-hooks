/**
 * title: 监听多个事件
 * desc: 试试点击左键和右键查看效果
 */
import * as React from 'react';
import { useClickAway } from 'rc-hooks';

const Demo: React.FC = () => {
  const [count, setCount] = React.useState(0);

  useClickAway(
    () => document.querySelector('#box4'),
    () => {
      setCount((c) => c + 1);
    },
    ['contextmenu', 'click']
  );

  return (
    <div>
      <span id="box4">
        <button>box</button>
      </span>
      <p>count: {count}</p>
    </div>
  );
};

export default Demo;
