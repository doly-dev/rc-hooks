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

// type Ref = ((instance: HTMLElement) => void) | React.RefObject<HTMLElement>;

declare const useClientRect: () => [Rect, any];

export default useClientRect;