import * as React from 'react';
import { useSafeState } from 'rc-hooks';

const Counter = () => {
  const [count, setCount] = useSafeState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((n) => n + 1);
    }, 10);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>计数：{count}</div>;
};

function Demo() {
  const [visible, setVisible] = useSafeState(true);

  return (
    <>
      <button onClick={() => setVisible((x) => !x)}>点击切换显示/隐藏</button>
      {visible && <Counter />}
    </>
  );
}

export default Demo;
