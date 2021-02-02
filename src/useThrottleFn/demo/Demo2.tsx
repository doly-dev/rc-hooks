/**
 * title: 对比
 * desc: 当 value 变化后，会每隔 1000ms 执行一次相关函数。
 */

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useThrottleFn } from 'rc-hooks';

export default () => {
  const [value, setValue] = useState('');
  const [throttleValue, setThrottleValue] = useState<string|undefined>();

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
      <p>value: {value}</p>
      <p>throttleValue: {throttleValue}</p>
    </div>
  );
};