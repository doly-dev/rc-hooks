import { renderHook, act } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { useLimitList } from '../..';

function sleep(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

describe('useLimitList', () => {
  it('should be defined', () => {
    expect(useLimitList).toBeDefined();
  });

  it('not limited', () => {
    const list = [1, 2, 3];
    const { result } = renderHook(() => {
      return useLimitList(list);
    });

    expect(result.current.canLimit).toBe(false);
    expect(result.current.limited).toBe(false);
    expect(result.current.data).toEqual(list);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.canLimit).toBe(false);
    expect(result.current.limited).toBe(false);
    expect(result.current.data).toEqual(list);
  });

  it('limited', () => {
    const list = [1, 2, 3, 4];
    const { result } = renderHook(() => {
      return useLimitList(list);
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(true);
    expect(result.current.data.length).toBe(3);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(false);
    expect(result.current.data.length).toBe(list.length);
  });

  it('change count and defaultLimited', () => {
    const list = [1, 2, 3, 4];
    const defaultCount = 1;
    const { result } = renderHook(() => {
      return useLimitList(list, {
        count: defaultCount,
        defaultLimited: false
      });
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(false);
    expect(result.current.data.length).toBe(list.length);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(true);
    expect(result.current.data.length).toBe(defaultCount);
  });

  it('async list', async () => {
    const { result } = renderHook(() => {
      const getList = async () => {
        await sleep();
        return [1, 2, 3, 4];
      };
      const [list, setList] = useState<number[]>([]);

      useEffect(() => {
        getList().then(setList);
      }, []);

      return useLimitList(list);
    });

    expect(result.current.canLimit).toBe(false);
    expect(result.current.limited).toBe(false);
    expect(result.current.data.length).toBe(0);

    await act(async () => {
      await sleep();
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(true);
    expect(result.current.data.length).toBe(3);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(false);
    expect(result.current.data.length).toBe(4);
  });
});
