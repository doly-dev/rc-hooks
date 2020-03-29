import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useMount } from 'rc-hooks';

const MyComponent = () => {
  useMount(
    () => {
      message.info('mount');
    }
  );

  return (<div>Hello World</div>)
}

export default () => {
  const [state, toggle] = useState(false);

  return (<>
    <Button onClick={() => toggle(s => !s)}>{state ? 'unmount' : 'mount'}</Button>
    {state && <MyComponent />}
  </>);
};