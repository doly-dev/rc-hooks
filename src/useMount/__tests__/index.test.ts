import { renderHook } from '@testing-library/react-hooks';
import useMount from '..';

describe('useMount', () => {
  it('should be defined', () => {
    expect(useMount).toBeDefined();
  });

  it('should not call provided callback on rerender', () => {
    const mockFn = jest.fn();
    const { unmount, rerender } = renderHook(() => useMount(mockFn));

    expect(mockFn).toBeCalledTimes(1);

    rerender();
    expect(mockFn).toBeCalledTimes(1);

    unmount();
    expect(mockFn).toBeCalledTimes(1);
  });
});