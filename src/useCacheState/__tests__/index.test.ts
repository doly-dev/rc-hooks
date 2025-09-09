import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { clearCacheState, useCacheState } from 'rc-hooks';

describe('useCacheState', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useCacheState).toBeDefined();
  });

  it('通过缓存读取状态值', async () => {
    const { result, rerender } = renderHook(() => {
      return useCacheState('my-key-1', 1);
    });

    expect(result.current[0]).toBe(1);
    await act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toBe(2);

    rerender();
    expect(result.current[0]).toBe(2);
  });

  it('数据存活时间', async () => {
    const hook1 = renderHook(() => {
      return useCacheState('my-key-2', 1, { ttl: 1000 });
    });
    expect(hook1.result.current[0]).toBe(1);
    await act(() => {
      hook1.result.current[1](2);
    });
    expect(hook1.result.current[0]).toBe(2);

    const hook2 = renderHook(() => {
      return useCacheState('my-key-2', 1); // 这里读取缓存值
    });
    expect(hook2.result.current[0]).toBe(2);

    // 缓存值过期
    jest.advanceTimersByTime(1001);
    const hook3 = renderHook(() => {
      return useCacheState('my-key-2', 1); // 这里读取默认值
    });
    expect(hook3.result.current[0]).toBe(1);
  });

  it('清理缓存', async () => {
    const hook1 = renderHook(() => {
      return useCacheState('my-key-3', 1);
    });
    expect(hook1.result.current[0]).toBe(1);
    await act(() => {
      hook1.result.current[1](2);
    });
    expect(hook1.result.current[0]).toBe(2);

    const hook2 = renderHook(() => {
      return useCacheState('my-key-3', 1); // 这里读取缓存值
    });
    expect(hook2.result.current[0]).toBe(2);

    // 清除缓存
    clearCacheState(undefined, 'my-key-3');
    const hook3 = renderHook(() => {
      return useCacheState('my-key-3', 1); // 这里读取默认值
    });
    expect(hook3.result.current[0]).toBe(1);
  });
});
