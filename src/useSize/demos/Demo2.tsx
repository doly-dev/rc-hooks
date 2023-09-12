import React from 'react';
import { useSize } from 'rc-hooks';

function Demo() {
  const size = useSize(() => document.body);

  // console.log('render');

  return (
    <>
      <h1>Hello, world</h1>
      <p>rect value: {JSON.stringify(size)}</p>
    </>
  );
}

export default Demo;
