interface ScrollToLowerOptions {
  ref?: React.Ref<HTMLElement> | null;
  threshold?: number;
  ready?: boolean;
  onLoad?: () => void;
}

declare function useScrollToBottomLoad(options?: ScrollToLowerOptions): void;

export default useScrollToBottomLoad;