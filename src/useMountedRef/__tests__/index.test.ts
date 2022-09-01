import { renderHook, act } from '@testing-library/react';
import useMountedRef from '..';

describe('useMountedRef', () => {
  it('work', () => {
    const { unmount, result } = renderHook(() => {
      const mountedRef = useMountedRef();
      return {
        mountedRef
      };
    });

    expect(result.current.mountedRef.current).toBe(true);

    act(() => {
      unmount();
    });
    expect(result.current.mountedRef.current).toBe(false);
  });
});
