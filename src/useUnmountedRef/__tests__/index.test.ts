import { renderHook, act } from '@testing-library/react';
import useUnmountedRef from '..';

describe('useUnmountedRef', () => {
  it('work', () => {
    const { unmount, result } = renderHook(() => {
      const unmountedRef = useUnmountedRef();
      return {
        unmountedRef
      };
    });

    expect(result.current.unmountedRef.current).toBe(false);

    act(() => {
      unmount();
    });
    expect(result.current.unmountedRef.current).toBe(true);
  });
});
