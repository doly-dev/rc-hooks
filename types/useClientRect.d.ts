import React from "react";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

type ReturnValue = [Rect, React.Ref];

declare const useClientRect: () => ReturnValue;

export default useClientRect;