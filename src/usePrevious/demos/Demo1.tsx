/**
 * title: 基础用法
 * desc: 记录上次的 value 值
 */

import React, { useState } from 'react';
import { usePrevious } from 'rc-hooks';

function Demo() {
  const [value, setValue] = useState('');
  const prevValue = usePrevious(value);

  return (
    <>
      <p>Now: {value}</p>
      <p>before: {prevValue}</p>
      <input type="text" onChange={e => setValue(e.target.value)} value={value} />
    </>
  );
}

export default Demo;
