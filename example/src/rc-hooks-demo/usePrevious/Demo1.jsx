import React, { useState } from "react";
import { usePrevious } from "rc-hooks";

export default () => {
  const [value, setValue] = useState(0);
  const prevValue = usePrevious(value);

  const handleInput = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <p>Now: {value}</p>
      <p>before: {prevValue}</p>
      <input type="text" onInput={handleInput} />
    </>
  );
}