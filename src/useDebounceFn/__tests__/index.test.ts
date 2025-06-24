import { renderHook } from '@testing-library/react';
import { useDebounceFn } from 'rc-hooks';

const setUp = (wait = 300) =>
  renderHook(() => {
    const fn = jest.fn();
    const { run, cancel, flush } = useDebounceFn(fn, wait);
    return {
      run,
      fn,
      cancel,
      flush
    };
  });

describe('useDebounceFn', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should call passed function after given amount of time', () => {
    const { result } = setUp();
    result.current.run();
    expect(result.current.fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(result.current.fn).toHaveBeenCalledTimes(1);
  });

  it('should cancel function call on unmount', () => {
    const { result, unmount } = setUp();
    result.current.run();
    expect(result.current.fn).not.toHaveBeenCalled();
    unmount();
    jest.advanceTimersByTime(300);
    expect(result.current.fn).not.toHaveBeenCalled();
  });

  it('should cancel', () => {
    const { result } = setUp();
    result.current.run();
    expect(result.current.fn).not.toHaveBeenCalled();
    result.current.cancel();
    jest.advanceTimersByTime(300);
    expect(result.current.fn).not.toHaveBeenCalled();
  });

  it('should multiple calls are executed only once', () => {
    const { result } = setUp();
    result.current.run();
    result.current.run();
    result.current.run();
    result.current.run();
    result.current.run();
    result.current.run();
    result.current.run();
    result.current.run();
    result.current.run();
    result.current.run();
    expect(result.current.fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(result.current.fn).toHaveBeenCalledTimes(1);
  });

  it('should multiple calls', () => {
    const { result } = setUp();
    result.current.run();
    expect(result.current.fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(result.current.fn).toHaveBeenCalledTimes(1);
    result.current.run();
    expect(result.current.fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(300);
    expect(result.current.fn).toHaveBeenCalledTimes(2);
  });

  it('should flush', () => {
    const { result } = setUp();
    result.current.run();
    expect(result.current.fn).not.toHaveBeenCalled();
    result.current.flush();
    expect(result.current.fn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(300);
    expect(result.current.fn).toHaveBeenCalledTimes(1);
  });
});
