import React from "react";
import { useClientRect } from "rc-hooks";

export default () => {
  const [rect, ref] = useClientRect();

  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <p>rect value: {JSON.stringify(rect)}</p>
      }
    </>
  );
}