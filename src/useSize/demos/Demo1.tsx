/**
 * desc: 获取 h1 元素大小
 */

import React, { useRef } from 'react';
import { useSize } from 'rc-hooks';

function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      <p>rect value: {JSON.stringify(size)}</p>
    </>
  );
}

export default Demo;
