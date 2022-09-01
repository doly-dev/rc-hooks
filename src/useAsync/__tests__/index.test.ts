import { act, renderHook, waitFor } from '@testing-library/react';
import { waitTime } from 'util-helpers';
import useAsync from '..';
import { clearCache } from '../..';

const asyncFunc = async (result = 1) => {
  await waitTime();
  if (result === 0) {
    throw 'error'
  }
  return 'success';
}

describe('useAsync', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  it('autoRun and success, error, finally callback', async () => {
    const errorCallback = jest.fn();
    const successCallback = jest.fn();
    const finallyCallback = jest.fn();

    const { result } = renderHook(() => useAsync(asyncFunc, {
      onSuccess: successCallback,
      onError: errorCallback,
      onFinally: finallyCallback
    }));

    expect(result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(0);
    expect(finallyCallback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(errorCallback).toHaveBeenCalledTimes(0);
      expect(successCallback).toHaveBeenCalledTimes(1);
      expect(finallyCallback).toHaveBeenCalledTimes(1);
    });

    act(() => {
      // 此处需要使用 catch 处理，不然会报错
      // ref: https://github.com/testing-library/react-testing-library/issues/982
      // ref: http://objcer.com/2017/12/27/unhandled-promise-rejections-in-node-js/
      result.current.run(0).catch(() => { });
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(errorCallback).toHaveBeenCalledTimes(1);
      expect(successCallback).toHaveBeenCalledTimes(1);
      expect(finallyCallback).toHaveBeenCalledTimes(2);
    });
  });

  it('not autoRun', async () => {
    const errorCallback = jest.fn();
    const successCallback = jest.fn();
    const finallyCallback = jest.fn();

    const { result } = renderHook(() => useAsync(asyncFunc, {
      autoRun: false,
      onSuccess: successCallback,
      onError: errorCallback,
      onFinally: finallyCallback
    }));

    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(0);
    expect(finallyCallback).toHaveBeenCalledTimes(0);

    act(() => {
      // 手动触发
      result.current.run().catch(() => { });
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(errorCallback).toHaveBeenCalledTimes(0);
      expect(successCallback).toHaveBeenCalledTimes(1);
      expect(finallyCallback).toHaveBeenCalledTimes(1);
    });
  });

  it('cacheKey and persisted', async () => {
    const errorCallback = jest.fn();
    const successCallback = jest.fn();
    const finallyCallback = jest.fn();
    const cacheKey = 'someString';

    const { result } = renderHook(() => useAsync(asyncFunc, {
      cacheKey,
      persisted: true,
      onSuccess: successCallback,
      onError: errorCallback,
      onFinally: finallyCallback
    }));

    expect(result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(0);
    expect(finallyCallback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(errorCallback).toHaveBeenCalledTimes(0);
      expect(successCallback).toHaveBeenCalledTimes(1);
      expect(finallyCallback).toHaveBeenCalledTimes(1);
    });

    act(() => {
      // 手动触发
      result.current.run().catch(() => { });
    });
    // 后面读取的缓存，不需要走异步方法
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(errorCallback).toHaveBeenCalledTimes(0);
      expect(successCallback).toHaveBeenCalledTimes(2);
      expect(finallyCallback).toHaveBeenCalledTimes(2);
    });

    // 清理缓存
    clearCache(cacheKey);
    act(() => {
      // 手动触发
      result.current.run().catch(() => { });
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(errorCallback).toHaveBeenCalledTimes(0);
      expect(successCallback).toHaveBeenCalledTimes(2);
      expect(finallyCallback).toHaveBeenCalledTimes(2);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(errorCallback).toHaveBeenCalledTimes(0);
      expect(successCallback).toHaveBeenCalledTimes(3);
      expect(finallyCallback).toHaveBeenCalledTimes(3);
    });

    // 清理缓存，请求失败
    clearCache(cacheKey);
    act(() => {
      // 手动触发
      result.current.run(0).catch(() => { });
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(errorCallback).toHaveBeenCalledTimes(0);
      expect(successCallback).toHaveBeenCalledTimes(3);
      expect(finallyCallback).toHaveBeenCalledTimes(3);
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(errorCallback).toHaveBeenCalledTimes(1);
      expect(successCallback).toHaveBeenCalledTimes(3);
      expect(finallyCallback).toHaveBeenCalledTimes(4);
    });
  });

});
