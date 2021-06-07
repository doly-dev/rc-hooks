import { renderHook } from '@testing-library/react-hooks';
import useUnmount from '..';

describe('useUnmount', () => {
  it('should be defined', () => {
    expect(useUnmount).toBeDefined();
  });

  it('should not call provided callback on re-renders', () => {
    const fn = jest.fn();
    const { rerender, unmount } = renderHook(() => useUnmount(fn));

    expect(fn).not.toHaveBeenCalled();

    rerender();
    expect(fn).not.toHaveBeenCalled();
    rerender();
    expect(fn).not.toHaveBeenCalled();
    rerender();
    expect(fn).not.toHaveBeenCalled();

    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call provided callback on unmount', () => {
    const fn = jest.fn();
    const { unmount } = renderHook(() => useUnmount(fn));

    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call provided callback if is has been changed', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();

    const { rerender, unmount } = renderHook((cb) => useUnmount(cb), {
      initialProps: fn1
    });


    rerender(fn2);
    rerender(fn3);
    unmount();

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).not.toHaveBeenCalled();
    expect(fn3).toHaveBeenCalledTimes(1);
  });
});