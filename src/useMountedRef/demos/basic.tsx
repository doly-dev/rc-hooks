/**
 * title: 基础用法
 * desc: 组件卸载后不再更新 `state`
 */
import * as React from 'react';
import { useMountedRef } from 'rc-hooks';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  const mountedRef = useMountedRef();

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (mountedRef.current) {
        setCount((n) => n + 1);
        return;
      }
      clearInterval(timer);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>计数：{count}</div>;
};

const Demo = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <button onClick={() => setVisible((x) => !x)}>点击切换显示/隐藏</button>
      {visible && <Counter />}
    </>
  );
};

export default Demo;
