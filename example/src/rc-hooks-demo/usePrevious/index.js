import React, { useState } from "react";
import { usePrevious } from "rc-hooks";

export default function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  const handleInput = (e) => {
    setCount(e.target.value);
  }

  return (
    <>
      <h1>Now: {count}, before: {prevCount}</h1>
      <input type="text" onInput={handleInput} />
    </>
  );
}