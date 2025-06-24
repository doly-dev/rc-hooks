import { useState, act } from 'react';
import { renderHook } from '@testing-library/react';
import { useThrottle } from 'rc-hooks';

const setUp = (wait = 300) =>
  renderHook(() => {
    const [state, setState] = useState(0);
    const throttleState = useThrottle(state, wait);
    return {
      state,
      setState,
      throttleState
    };
  });

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should work', async () => {
    const { result } = setUp();

    await act(async () => {
      result.current.setState(1);
      jest.advanceTimersByTime(100);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.throttleState).toBe(0);

    await act(async () => {
      result.current.setState(2);
    });

    expect(result.current.state).toBe(2);
    expect(result.current.throttleState).toBe(0);

    await act(async () => {
      // 因为延迟处理 state 所以要放在 act 中
      jest.advanceTimersByTime(300);
    });

    expect(result.current.state).toBe(2);
    expect(result.current.throttleState).toBe(2);

    await act(async () => {
      result.current.setState(3);
    });
    expect(result.current.state).toBe(3);
    expect(result.current.throttleState).toBe(3);
    await act(async () => {
      result.current.setState(4);
    });
    expect(result.current.state).toBe(4);
    expect(result.current.throttleState).toBe(3);
    jest.advanceTimersByTime(100);
    await act(async () => {
      result.current.setState(5);
    });
    expect(result.current.state).toBe(5);
    expect(result.current.throttleState).toBe(3);
    await act(async () => {
      // 因为延迟处理 state 所以要放在 act 中
      jest.advanceTimersByTime(200);
    });
    expect(result.current.state).toBe(5);
    expect(result.current.throttleState).toBe(5);
  });

  it('should cancel function call on unmount', async () => {
    const { result, unmount } = setUp();

    await act(async () => {
      result.current.setState(1);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.throttleState).toBe(0);

    unmount();

    jest.advanceTimersByTime(300);

    expect(result.current.state).toBe(1);
    expect(result.current.throttleState).toBe(0);
  });
});
