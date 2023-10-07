/**
 * desc: 在组件卸载时，执行方法。
 */

import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useUnmount } from 'rc-hooks';

const MyComponent = () => {
  useUnmount(() => {
    message.info('unmount');
  });

  return <div>Hello World</div>;
};

function Demo() {
  const [state, toggle] = useState(true);

  return (
    <>
      <Button onClick={() => toggle((s) => !s)}>{state ? 'unmount' : 'mount'}</Button>
      {state && <MyComponent />}
    </>
  );
}

export default Demo;
