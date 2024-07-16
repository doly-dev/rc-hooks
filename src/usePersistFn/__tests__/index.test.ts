import { useState, act } from 'react';
import { renderHook } from '@testing-library/react';
import usePersistFn from '..';

describe('usePersistFn', () => {
  it('should work', async () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    const { result, rerender } = renderHook(
      (cb) => {
        const [count, setCount] = useState(0);

        const add = () => setCount((x) => x + 1);

        const persistFn = usePersistFn(() => {
          cb();
          return count;
        });

        return { add, persistFn, count };
      },
      {
        initialProps: fn1
      }
    );

    expect(result.current.count).toBe(0);
    expect(fn1).not.toHaveBeenCalled();

    let currentCount: number;

    currentCount = result.current.persistFn();
    expect(currentCount).toBe(result.current.count);
    expect(fn1).toHaveBeenCalledTimes(1);

    await act(async () => {
      result.current.add();
    });

    currentCount = result.current.persistFn();
    expect(currentCount).toBe(result.current.count);
    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).not.toHaveBeenCalled();

    rerender(fn2);
    currentCount = result.current.persistFn();
    expect(currentCount).toBe(result.current.count);
    expect(fn1).toHaveBeenCalledTimes(2);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
});
