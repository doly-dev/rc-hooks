import { act, renderHook } from '@testing-library/react';
import useSize from '..';

let callback;
jest.mock('../ResizeObserver', () => {
  return jest.fn().mockImplementation((cb) => {
    callback = cb;
    return {
      observe: () => { },
      disconnect: () => { },
    };
  });
});

describe('useSize', () => {
  it('should be defined', () => {
    expect(useSize).toBeDefined();
  });

  it('target is null', () => {
    const { result } = renderHook(() => {
      return useSize(null);
    });

    expect(result.current.height).toBeUndefined();
    expect(result.current.width).toBeUndefined();
  });

  it('work', () => {
    const targetEl = document.createElement('div');
    const { result } = renderHook(() => useSize(targetEl));

    act(() => {
      callback([{
        target: {
          clientWidth: 100,
          clientHeight: 50
        }
      }]);
    });

    expect(result.current).toEqual({ width: 100, height: 50 });
  });

});
