/**
 * title: 基础用法
 * desc: 点击按钮和按钮外的元素查看效果
 */
import * as React from 'react';
import { useClickAway } from 'rc-hooks';

const Demo: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);

  useClickAway(ref, () => {
    setCount((c) => c + 1);
  });

  return (
    <div>
      <span ref={ref}>
        <button>box</button>
      </span>
      <p>count: {count}</p>
    </div>
  );
};

export default Demo;
