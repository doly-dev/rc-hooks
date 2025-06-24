import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useMountedRef } from 'rc-hooks';

describe('useMountedRef', () => {
  it('work', async () => {
    const { unmount, result } = renderHook(() => {
      const mountedRef = useMountedRef();
      return {
        mountedRef
      };
    });

    expect(result.current.mountedRef.current).toBe(true);

    await act(async () => {
      unmount();
    });
    expect(result.current.mountedRef.current).toBe(false);
  });
});
