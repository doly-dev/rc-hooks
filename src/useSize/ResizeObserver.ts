import throttle from 'lodash.throttle';
import type { DebouncedFunc } from 'lodash';
import isBrowser from '../utils/isBrowser';

// Minimum delay before invoking the update of observers.
const REFRESH_DELAY = 50;

// ref: https://github.com/que-etc/resize-observer-polyfill/blob/master/src/ResizeObserverController.js
// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
const transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

const defaultObserverOptions = {
  characterData: true, // 监视指定目标节点或子节点树中节点所包含的字符数据的变化
  childList: true,  // 观察目标子节点的变化，是否有添加或者删除
  attributes: true, // 观察属性变动
  subtree: true     // 观察后代节点，默认为 false
};

type CallbackType = (mutations: (Omit<MutationRecord, 'target'> & { target: HTMLElement | null; })[], observer: MutationObserver) => void;

class ResizeObserver {
  readonly observer;
  private throttleRefresh: DebouncedFunc<() => void>;
  targetNode: null | HTMLElement;
  readonly callback;

  constructor(callback: CallbackType) {
    this.throttleRefresh = throttle(this.refresh, REFRESH_DELAY);
    this.targetNode = null;
    this.callback = callback;
    this.observer = new MutationObserver(this.throttleRefresh);
  }

  private refresh = () => {
    if (this.targetNode) {
      this.callback([{
        target: this.targetNode
      }] as any, {} as any);
    }
  }

  onTransitionEnd_({ propertyName = '' }) {
    const isReflowProperty = transitionKeys.some(key => {
      return propertyName.indexOf(key) > -1;
    });

    if (isReflowProperty) {
      this.throttleRefresh();
    }
  }

  observe(targetNode: HTMLElement, options?: MutationObserverInit) {

    if (!isBrowser) {
      return;
    }

    this.targetNode = targetNode;

    document.addEventListener('transitionend', this.onTransitionEnd_);
    window.addEventListener('resize', this.throttleRefresh);
    this.observer.observe(document, {
      ...defaultObserverOptions,
      ...options
    });
  }

  disconnect() {
    if (!isBrowser) {
      return;
    }
    this.throttleRefresh.cancel();
    this.targetNode = null;
    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.throttleRefresh);
    this.observer.disconnect();
  }
}

export default ResizeObserver;