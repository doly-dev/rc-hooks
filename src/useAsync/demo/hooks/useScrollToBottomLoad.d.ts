interface ScrollToLowerOptions {
  ref?: null | React.RefObject<HTMLElement>;
  threshold?: number;
  ready?: boolean;
  onLoad?: () => void;
}

declare function useScrollToBottomLoad(options?: ScrollToLowerOptions): void;

export default useScrollToBottomLoad;