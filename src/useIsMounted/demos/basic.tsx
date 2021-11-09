/**
 * title: 基础用法
 * desc: 组件卸载后不再更新 `state`，防止警告内存溢出
 */
import * as React from 'react';
import useIsMounted from '..';

const Demo: React.FC = () => {
  const [count, setCount] = React.useState(0);
  const isMountedRef = useIsMounted();

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (isMountedRef.current) {
        setCount((n) => n + 1);
        return;
      }
      clearInterval(timer);
    }, 100);

    // return () => {
    //   clearInterval(timer);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>计数：{count}</div>;
};

export default Demo;
