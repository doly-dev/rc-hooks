/**
 * desc: 支持传入多个目标对象
 */
import * as React from 'react';
import { useClickAway } from 'rc-hooks';

const Demo: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);

  useClickAway([ref, () => document.querySelector('#box2')], () => {
    setCount((c) => c + 1);
  });

  return (
    <div>
      <span ref={ref}>
        <button>box</button>
      </span>
      <span id="box2" style={{ marginLeft: 20 }}>
        <button>box</button>
      </span>
      <p>count: {count}</p>
    </div>
  );
};

export default Demo;
