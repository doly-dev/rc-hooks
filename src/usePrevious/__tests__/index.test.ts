import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import usePrevious from '..';

describe('usePrevious', () => {
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

  it('other state update', () => {
    const { result } = renderHook(() => {
      const [count1, setCount1] = useState(0);
      const [count2, setCount2] = useState(0);
      const prevCount1 = usePrevious(count1);

      return {
        count1,
        setCount1,
        count2,
        setCount2,
        prevCount1
      }
    });

    expect(result.current.count1).toBe(0);
    expect(result.current.prevCount1).toBeUndefined();

    act(() => {
      result.current.setCount1(1);
    });

    expect(result.current.count1).toBe(1);
    expect(result.current.prevCount1).toBe(0);

    act(() => {
      result.current.setCount2(1);
    });

    expect(result.current.count1).toBe(1);
    expect(result.current.prevCount1).toBe(0);


  });
});
