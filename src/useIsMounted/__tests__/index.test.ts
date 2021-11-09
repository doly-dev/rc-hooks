import { renderHook, act } from '@testing-library/react-hooks';
import { useIsMounted } from '../..';

describe('useIsMounted', () => {
  it('should be defined', () => {
    expect(useIsMounted).toBeDefined();
  });

  it('work', () => {
    const { unmount, result } = renderHook(() => {
      const isMounted = useIsMounted();
      return {
        isMounted
      };
    });

    expect(result.current.isMounted.current).toBe(true);

    act(() => {
      unmount();
      expect(result.current.isMounted.current).toBe(false);
    });
  });
});
