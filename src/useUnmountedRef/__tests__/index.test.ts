import { act } from 'react';
import { renderHook } from '@testing-library/react';
import useUnmountedRef from '..';

describe('useUnmountedRef', () => {
  it('work', async () => {
    const { unmount, result } = renderHook(() => {
      const unmountedRef = useUnmountedRef();
      return {
        unmountedRef
      };
    });

    expect(result.current.unmountedRef.current).toBe(false);

    await act(async () => {
      unmount();
    });
    expect(result.current.unmountedRef.current).toBe(true);
  });
});
