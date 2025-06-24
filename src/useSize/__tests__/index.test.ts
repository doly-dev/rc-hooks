import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useSize } from 'rc-hooks';

let callback: (e: any) => void;
jest.mock('../ResizeObserver', () => {
  return jest.fn().mockImplementation((cb) => {
    callback = cb;
    return {
      observe: () => {},
      disconnect: () => {}
    };
  });
});

describe('useSize', () => {
  it('target is null', async () => {
    const { result } = renderHook(() => {
      return useSize(null);
    });

    expect(result.current.height).toBeUndefined();
    expect(result.current.width).toBeUndefined();
  });

  it('work', async () => {
    const targetEl = document.createElement('div');
    const { result } = renderHook(() => useSize(targetEl));

    await act(async () => {
      callback([
        {
          target: {
            clientWidth: 100,
            clientHeight: 50
          }
        }
      ]);
    });

    expect(result.current).toEqual({ width: 100, height: 50 });
  });
});
