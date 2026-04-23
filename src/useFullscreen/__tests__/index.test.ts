import { renderHook, act } from '@testing-library/react';
import { useFullscreen } from 'rc-hooks';

describe('useFullscreen', () => {
  beforeEach(() => {
    // 模拟全屏相关方法
    (document as any).fullscreenElement = null;
    (document as any).webkitFullscreenElement = null;
    (document as any).mozFullScreenElement = null;
    (document as any).msFullscreenElement = null;
    (document as any).exitFullscreen = jest.fn();
    (document as any).webkitExitFullscreen = jest.fn();
    (document as any).mozCancelFullScreen = jest.fn();
    (document as any).msExitFullscreen = jest.fn();
    // 模拟document.documentElement的全屏方法
    (document.documentElement as any).requestFullscreen = jest.fn();
    (document.documentElement as any).webkitRequestFullscreen = jest.fn();
    (document.documentElement as any).mozRequestFullScreen = jest.fn();
    (document.documentElement as any).msRequestFullscreen = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return isFullscreen as false initially', () => {
    const { result } = renderHook(() => useFullscreen());
    expect(result.current.isFullscreen).toBe(false);
  });

  it('should enter fullscreen when enter is called', () => {
    const { result } = renderHook(() => useFullscreen());
    act(() => {
      result.current.enter();
    });
    expect((document.documentElement as any).requestFullscreen).toHaveBeenCalled();
  });

  it('should exit fullscreen when exit is called', () => {
    (document as any).fullscreenElement = document.createElement('div');
    const { result } = renderHook(() => useFullscreen());
    act(() => {
      result.current.exit();
    });
    expect((document as any).exitFullscreen).toHaveBeenCalled();
  });

  it('should toggle fullscreen when toggle is called', () => {
    const { result } = renderHook(() => useFullscreen());
    expect(result.current.isFullscreen).toBe(false);
    act(() => {
      result.current.toggle();
    });
    expect((document.documentElement as any).requestFullscreen).toHaveBeenCalled();
  });

  it('should call onEnter when entering fullscreen', () => {
    const onEnter = jest.fn();
    renderHook(() => useFullscreen(undefined, { onEnter }));
    // 模拟进入全屏
    (document as any).fullscreenElement = document.createElement('div');
    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    expect(onEnter).toHaveBeenCalled();
  });

  it('should call onExit when exiting fullscreen', () => {
    const onExit = jest.fn();
    renderHook(() => useFullscreen(undefined, { onExit }));
    // 模拟进入全屏
    (document as any).fullscreenElement = document.createElement('div');
    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    // 模拟退出全屏
    (document as any).fullscreenElement = null;
    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'));
    });
    expect(onExit).toHaveBeenCalled();
  });

  it('should use provided ref when entering fullscreen', () => {
    const refElement = document.createElement('div');
    refElement.requestFullscreen = jest.fn();
    const ref = { current: refElement };
    const { result } = renderHook(() => useFullscreen(ref));
    act(() => {
      result.current.enter();
    });
    expect(refElement.requestFullscreen).toHaveBeenCalled();
  });
});
