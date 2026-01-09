import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { sleep } from 'ut2';
import { useAsync, clearCache } from 'rc-hooks';

const mock = jest.fn();
const asyncFunc = async (result = 1) => {
  mock(result);
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

  beforeEach(() => {
    mock.mockReset();
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

  it('异步函数 pendding 阶段，多次调用只会执行最后一次', async () => {
    const successCallback = jest.fn();
    const { result } = renderHook(() => useAsync(asyncFunc, { onSuccess: successCallback }));

    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      // 手动触发
      result.current.run();
      result.current.run();
      result.current.run();
    });

    expect(mock).toHaveBeenCalledTimes(4);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(mock).toHaveBeenCalledTimes(4);
    expect(result.current.loading).toBe(false);
    expect(successCallback).toHaveBeenCalledTimes(1);
  });

  it('防抖和节流异步函数 pendding 阶段，多次调用也只执行一次。（异步比间隔时间先执行完成）', async () => {
    const successCallback = jest.fn();
    const { result } = renderHook(() =>
      useAsync(asyncFunc, { onSuccess: successCallback, throttleInterval: 2000 })
    );

    // 初始自动调用
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      // 手动触发
      result.current.run();
      result.current.run();
      result.current.run();
    });

    // 节流期间
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    // 节流期间
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      // 手动触发
      result.current.run();
      result.current.run();
      result.current.run();
    });

    // 节流期间
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    // 节流期间
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(successCallback).toHaveBeenCalledTimes(1);

    // 2000毫秒后会再次调用节流异步函数
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mock).toHaveBeenCalledTimes(2);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(1);

    // 异步函数执行完成
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mock).toHaveBeenCalledTimes(2);
    expect(result.current.loading).toBe(false);
    expect(successCallback).toHaveBeenCalledTimes(2);
  });

  it('防抖和节流异步函数 pendding 阶段，多次调用也只执行一次。（异步比间隔时间后完成）', async () => {
    const successCallback = jest.fn();
    const { result } = renderHook(() =>
      useAsync(asyncFunc, { onSuccess: successCallback, throttleInterval: 500 })
    );

    // 初始自动调用
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      // 手动触发
      result.current.run();
      result.current.run();
      result.current.run();
    });

    // 节流期间
    expect(mock).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    // 节流结束，异步函数未执行完成
    expect(mock).toHaveBeenCalledTimes(2);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    await act(async () => {
      // 手动触发
      result.current.run();
      result.current.run();
      result.current.run();
    });

    // 上一个异步函数未执行完成，执行 run ，上个异步函数不会触发回调
    expect(mock).toHaveBeenCalledTimes(3);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    // 上一个异步函数执行完成，由于中间执行 run ，不会触发回调。
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(mock).toHaveBeenCalledTimes(4);
    expect(result.current.loading).toBe(true);
    expect(successCallback).toHaveBeenCalledTimes(0);

    // 异步函数执行完成
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mock).toHaveBeenCalledTimes(4);
    expect(result.current.loading).toBe(false);
    expect(successCallback).toHaveBeenCalledTimes(1);
  });

  it('共享异步', async () => {
    // 不同的异步函数，设置同一个缓存key。在其中一个异步函数 pending 阶段，调用另一个异步函数会共享异步结果。
    const successCallback1 = jest.fn();
    const result1 = renderHook(() =>
      useAsync(asyncFunc, { cacheKey: 'sharedAsync', onSuccess: successCallback1 })
    );

    const successCallback2 = jest.fn();
    const result2 = renderHook(() =>
      useAsync(asyncFunc, { cacheKey: 'sharedAsync', onSuccess: successCallback2 })
    );

    // 初始自动调用
    expect(mock).toHaveBeenCalledTimes(1); // 同一个缓存key，只调用一次异步函数
    expect(result1.result.current.loading).toBe(true);
    expect(successCallback1).toHaveBeenCalledTimes(0);
    expect(result2.result.current.loading).toBe(true);
    expect(successCallback2).toHaveBeenCalledTimes(0);

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(result1.result.current.loading).toBe(false);
    expect(successCallback1).toHaveBeenCalledTimes(1);
    expect(result2.result.current.loading).toBe(false);
    expect(successCallback2).toHaveBeenCalledTimes(1);

    // 异步1 手动触发
    await act(async () => {
      result1.result.current.run();
    });

    expect(mock).toHaveBeenCalledTimes(2);
    expect(result1.result.current.loading).toBe(true);
    expect(successCallback1).toHaveBeenCalledTimes(1);
    expect(result2.result.current.loading).toBe(false);
    expect(successCallback2).toHaveBeenCalledTimes(1);

    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(mock).toHaveBeenCalledTimes(2);
    expect(result1.result.current.loading).toBe(true);
    expect(successCallback1).toHaveBeenCalledTimes(1);
    expect(result2.result.current.loading).toBe(false);
    expect(successCallback2).toHaveBeenCalledTimes(1);

    // 异步2 手动触发
    // 异步2共享异步1 执行中
    await act(async () => {
      result2.result.current.run();
    });

    expect(mock).toHaveBeenCalledTimes(2);
    expect(result1.result.current.loading).toBe(true);
    expect(successCallback1).toHaveBeenCalledTimes(1);
    expect(result2.result.current.loading).toBe(true);
    expect(successCallback2).toHaveBeenCalledTimes(1);

    // 异步1 执行完成
    // 异步2共享异步1 执行完成
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    expect(mock).toHaveBeenCalledTimes(2);
    expect(result1.result.current.loading).toBe(false);
    expect(successCallback1).toHaveBeenCalledTimes(2);
    expect(result2.result.current.loading).toBe(false);
    expect(successCallback2).toHaveBeenCalledTimes(2);
  });
});
