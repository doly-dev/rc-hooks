import React, { useState } from 'react';
import { Button } from 'antd';
import { useDebounceFn } from 'rc-hooks';

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useDebounceFn(setValue, 500);

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <Button onClick={() => run(value + 1)}>Click fast!</Button>
    </div>
  );
};