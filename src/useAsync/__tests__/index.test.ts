import { act, renderHook, waitFor } from '@testing-library/react';
import { waitTime } from 'util-helpers';
import useAsync from '..';

const asyncFunc = async (result = 1) => {
  await waitTime(300);
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
      result.current.run(0).catch(() => { });
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

});
