import { renderHook } from '@testing-library/react';
import { useUpdateLayoutEffect } from '../..';

describe('useUpdateLayoutEffect', () => {
  it('should be defined', () => {
    expect(useUpdateLayoutEffect).toBeDefined();
  });

  it('should run effect on update', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useUpdateLayoutEffect(effect));

    expect(effect).not.toHaveBeenCalled();

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('should run effect on update', () => {
    let renders = 0;
    let mountState = 1;

    const { rerender } = renderHook(() =>
      useUpdateLayoutEffect(() => {
        renders++;
      }, [mountState])
    );

    expect(renders).toBe(0);

    mountState = 2;
    rerender();
    expect(renders).toBe(1);

    mountState = 3;
    rerender();
    expect(renders).toBe(2);
  });

  it('should run cleanup on unmount', () => {
    const cleanup = jest.fn();
    const effect = jest.fn().mockReturnValue(cleanup);

    const { rerender, unmount } = renderHook(() => useUpdateLayoutEffect(effect));

    expect(cleanup).not.toHaveBeenCalled();

    rerender();
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
