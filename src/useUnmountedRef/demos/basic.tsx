/**
 * desc: 组件卸载后不再更新 `state`
 */
import * as React from 'react';
import { useUnmountedRef } from 'rc-hooks';

const Counter: React.FC<{
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ count, setCount }) => {
  const unmountedRef = useUnmountedRef();

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (unmountedRef.current) {
        clearInterval(timer);
        return;
      }
      setCount((n) => n + 1);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>计数：{count}</div>;
};

function Demo() {
  const [count, setCount] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <button onClick={() => setVisible((x) => !x)}>点击切换显示/隐藏</button>
      {visible && <Counter count={count} setCount={setCount} />}
    </>
  );
}

export default Demo;
