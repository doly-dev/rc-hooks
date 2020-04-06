import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useThrottleFn } from 'rc-hooks';

export default () => {
  const [value, setValue] = useState();
  const [throttleValue, setThrottleValue] = useState();

  const { run, cancel } = useThrottleFn(setThrottleValue, 1000);

  return (
    <div>
      <Input
        value={value}
        onChange={e => {
          setValue(e.target.value);
          run(e.target.value);
        }}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ margin: '16px 0' }}>
        <Button onClick={cancel}>Cancel Throttle</Button>
      </p>
      <p>throttleValue: {throttleValue}</p>
    </div>
  );
};