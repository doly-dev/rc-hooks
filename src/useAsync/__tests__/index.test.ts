import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { sleep } from 'ut2';
import useAsync from '..';
import { clearCache } from '../..';

const asyncFunc = async (result = 1) => {
  await sleep();
  if (result === 0) {
    throw 'error';
  }
  return 'success';
};

describe('useAsync', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('autoRun and success, error, finally callback', async () => {
    const errorCallback = jest.fn();
    const successCallback = jest.fn();
    const finallyCallback = jest.fn();

    const { result } = renderHook(() =>
      useAsync(asyncFunc, {
        onSuccess: successCallback,
        onError: errorCallback,
        onFinally: finallyCallback
      })
    );

    expect(result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(0);
    expect(finallyCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      jest.runAllTimers();
    });
    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(1);
    expect(finallyCallback).toHaveBeenCalledTimes(1);

    await act(async () => {
      // 此处需要使用 catch 处理，不然会报错
      // ref: https://github.com/testing-library/react-testing-library/issues/982
      // ref: http://objcer.com/2017/12/27/unhandled-promise-rejections-in-node-js/
      result.current.run(0).catch(() => {});
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);
    expect(successCallback).toHaveBeenCalledTimes(1);
    expect(finallyCallback).toHaveBeenCalledTimes(2);
  });

  it('not autoRun', async () => {
    const errorCallback = jest.fn();
    const successCallback = jest.fn();
    const finallyCallback = jest.fn();

    const { result } = renderHook(() =>
      useAsync(asyncFunc, {
        autoRun: false,
        onSuccess: successCallback,
        onError: errorCallback,
        onFinally: finallyCallback
      })
    );

    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(0);
    expect(finallyCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      // 手动触发
      result.current.run();
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(1);
    expect(finallyCallback).toHaveBeenCalledTimes(1);
  });

  it('cacheKey and persisted', async () => {
    const errorCallback = jest.fn();
    const successCallback = jest.fn();
    const finallyCallback = jest.fn();
    const cacheKey = 'someString';

    const { result } = renderHook(() =>
      useAsync(asyncFunc, {
        cacheKey,
        persisted: true,
        onSuccess: successCallback,
        onError: errorCallback,
        onFinally: finallyCallback
      })
    );

    expect(result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(0);
    expect(finallyCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(1);
    expect(finallyCallback).toHaveBeenCalledTimes(1);

    await act(async () => {
      // 手动触发
      result.current.run();
    });

    // 后面读取的缓存，不需要走异步方法
    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(2);
    expect(finallyCallback).toHaveBeenCalledTimes(2);

    // 清理缓存
    clearCache(cacheKey);

    await act(async () => {
      // 手动触发
      result.current.run();
    });

    expect(result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(2);
    expect(finallyCallback).toHaveBeenCalledTimes(2);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(3);
    expect(finallyCallback).toHaveBeenCalledTimes(3);

    // 清理缓存，请求失败
    clearCache(cacheKey);

    await act(async () => {
      // 手动触发
      result.current.run(0).catch(() => {});
    });

    expect(result.current.loading).toBe(true);
    expect(errorCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(3);
    expect(finallyCallback).toHaveBeenCalledTimes(3);

    await act(async () => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);
    expect(successCallback).toHaveBeenCalledTimes(3);
    expect(finallyCallback).toHaveBeenCalledTimes(4);
  });
});
