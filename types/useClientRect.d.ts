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

declare const useClientRect: () => [Rect, React.Ref<HTMLElement>];

export default useClientRect;