import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from '../..';

describe('usePrevious', () => {
  it('should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  const setUp = () =>
    renderHook(({ state }) => usePrevious(state), {
      initialProps: {
        state: 0
      }
    });

  it('should return undefined on initial render', () => {
    const { result } = setUp();
    expect(result.current).toBeUndefined();
  });

  it('should always return previous state after each update', () => {
    const { rerender, result } = setUp();

    rerender({ state: 1 });
    expect(result.current).toBe(0);

    rerender({ state: 2 });
    expect(result.current).toBe(1);

    rerender({ state: 3 });
    expect(result.current).toBe(2);
  });
});
