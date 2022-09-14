/**
 * title: 不受其他状态影响
 */

import React, { useState } from 'react';
import { usePrevious } from 'rc-hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const prevValue = usePrevious(value);

  return (
    <>
      <p>Now: {value}</p>
      <p>before: {prevValue}</p>
      <input type="text" onChange={e => setValue(e.target.value)} value={value} />
      <p>count: {count}</p>
      <button type='button' onClick={() => setCount(x => x + 1)}>add count</button>
    </>
  );
}

export default Demo;
