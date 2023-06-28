import { renderHook, act } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { sleep } from 'ut2';
import useLimitList from '..';

describe('useLimitList', () => {
  it('not limited', () => {
    const list = [1, 2, 3];
    const { result } = renderHook(() => {
      return useLimitList(list);
    });

    expect(result.current.canLimit).toBe(false);
    expect(result.current.limited).toBe(true);
    expect(result.current.data).toEqual(list);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.canLimit).toBe(false);
    expect(result.current.limited).toBe(true);
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
    const { result } = renderHook(() => {
      const [count, setCount] = useState(1);

      const limitResult = useLimitList(list, {
        count: count,
        defaultLimited: false
      });

      return {
        ...limitResult,
        setCount
      }
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(false);
    expect(result.current.data.length).toBe(list.length);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(true);
    expect(result.current.data.length).toBe(1);

    act(() => {
      result.current.setCount(3);
    });

    expect(result.current.canLimit).toBe(true);
    expect(result.current.limited).toBe(true);
    expect(result.current.data.length).toBe(3);

  });

  it('async list', async () => {
    const { result } = renderHook(() => {
      const getList = async () => {
        await sleep(1000);
        return [1, 2, 3, 4];
      };
      const [list, setList] = useState<number[]>([]);

      useEffect(() => {
        getList().then(setList);
      }, []);

      return useLimitList(list);
    });

    expect(result.current.canLimit).toBe(false);
    expect(result.current.limited).toBe(true);
    expect(result.current.data.length).toBe(0);

    await act(async () => {
      await sleep(1000);
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
