import { renderHook } from '@testing-library/react';
import { useMount } from 'rc-hooks';

describe('useMount', () => {
  it('should not call provided callback on rerender', () => {
    const mockFn = jest.fn();
    const { unmount, rerender } = renderHook(() => useMount(mockFn));

    expect(mockFn).toHaveBeenCalledTimes(1);

    rerender();
    expect(mockFn).toHaveBeenCalledTimes(1);

    unmount();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
