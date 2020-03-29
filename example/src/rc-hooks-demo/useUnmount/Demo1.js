import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useUnmount } from 'rc-hooks';

const MyComponent = () => {
  useUnmount(
    () => {
      message.info('unmount');
    }
  );

  return (<div>Hello World</div>)
}

export default () => {
  const [state, toggle] = useState(true);

  return (<>
    <Button onClick={() => toggle(s => !s)}>{state ? 'unmount' : 'mount'}</Button>
    {state && <MyComponent />}
  </>);
};