import { useState, useEffect } from 'react';
import { isBrowser } from 'ut2';
import getRef, { RefType } from '../utils/getRef';
import useLatest from '../useLatest';
import useUpdateEffect from '../useUpdateEffect';

/**
 * 管理全屏状态的 Hook。
 *
 * @param {Object} [ref] Dom 节点或 Ref 对象。如果不传，则默认使用 document.documentElement。
 * @param {Object} [options] 配置项
 * @param {Function} [options.onEnter] 进入全屏时的回调
 * @param {Function} [options.onExit] 退出全屏时的回调
 * @example
 * const ref = React.useRef<HTMLDivElement>(null);
 * const { isFullscreen, enter, exit, toggle } = useFullscreen(ref);
 *
 * return (
 *   <div ref={ref} style={{ width: '100px', height: '100px', background: '#f0f0f0' }}>
 *     <div style={{ marginBottom: 20 }}>点击按钮切换全屏</div>
 *     <button onClick={toggle}>
 *       {isFullscreen ? '退出全屏' : '进入全屏'}
 *     </button>
 *   </div>
 * );
 */
function useFullscreen(
  ref?: RefType,
  options?: {
    onEnter?: () => void;
    onExit?: () => void;
  }
) {
  const { onEnter, onExit } = options || {};
  const [isFullscreen, setIsFullscreen] = useState(false);
  const onEnterRef = useLatest(onEnter);
  const onExitRef = useLatest(onExit);

  const enter = () => {
    const element = ref ? getRef(ref) : document.documentElement;
    if (element) {
      const requestFullscreen =
        element.requestFullscreen ||
        (element as any).webkitRequestFullscreen ||
        (element as any).mozRequestFullScreen ||
        (element as any).msRequestFullscreen;
      if (requestFullscreen) {
        requestFullscreen.call(element);
      }
    }
  };

  const exit = () => {
    const exitFullscreen =
      document.exitFullscreen ||
      (document as any).webkitExitFullscreen ||
      (document as any).mozCancelFullScreen ||
      (document as any).msExitFullscreen;
    if (exitFullscreen) {
      exitFullscreen.call(document);
    }
  };

  const toggle = () => {
    if (isFullscreen) {
      exit();
    } else {
      enter();
    }
  };

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const checkFullscreen = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };

    // 检测浏览器支持的全屏事件名称
    let fullscreenEventName: string;
    if ('fullscreenElement' in document) {
      fullscreenEventName = 'fullscreenchange';
    } else if ('webkitFullscreenElement' in document) {
      fullscreenEventName = 'webkitfullscreenchange';
    } else if ('mozFullScreenElement' in document) {
      fullscreenEventName = 'mozfullscreenchange';
    } else if ('msFullscreenElement' in document) {
      fullscreenEventName = 'MSFullscreenChange';
    } else {
      // 如果不支持全屏API，不绑定事件
      return;
    }

    // 只绑定浏览器支持的事件
    document.addEventListener(fullscreenEventName, checkFullscreen);

    return () => {
      // 只移除绑定的事件
      document.removeEventListener(fullscreenEventName, checkFullscreen);
    };
  }, []);

  useUpdateEffect(() => {
    if (isFullscreen) {
      onEnterRef.current?.();
    } else {
      onExitRef.current?.();
    }
  }, [isFullscreen]);

  return {
    isFullscreen,
    enter,
    exit,
    toggle
  };
}

export default useFullscreen;
