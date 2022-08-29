import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
import type { ThrottleSettings } from 'lodash';
import { useThrottle } from '../..';

const setUp = (wait = 300, options?: ThrottleSettings) =>
  renderHook(() => {
    const [state, setState] = useState(0);
    const throttleState = useThrottle(state, wait, options);
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

  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('should work', () => {
    const { result } = setUp();

    act(() => {
      result.current.setState(1);
      jest.advanceTimersByTime(100);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.throttleState).toBe(0);

    act(() => {
      result.current.setState(2);
    });

    expect(result.current.state).toBe(2);
    expect(result.current.throttleState).toBe(0);

    act(() => {
      // 因为延迟处理 state 所以要放在 act 中
      jest.advanceTimersByTime(300);
    });

    expect(result.current.state).toBe(2);
    expect(result.current.throttleState).toBe(2);

    act(() => {
      result.current.setState(3);
    });
    expect(result.current.state).toBe(3);
    expect(result.current.throttleState).toBe(3);
    act(() => {
      result.current.setState(4);
    });
    expect(result.current.state).toBe(4);
    expect(result.current.throttleState).toBe(3);
    jest.advanceTimersByTime(100);
    act(() => {
      result.current.setState(5);
    });
    expect(result.current.state).toBe(5);
    expect(result.current.throttleState).toBe(3);
    act(() => {
      // 因为延迟处理 state 所以要放在 act 中
      jest.advanceTimersByTime(200);
    });
    expect(result.current.state).toBe(5);
    expect(result.current.throttleState).toBe(5);
  });

  it('should cancel function call on unmount', async () => {
    const { result, unmount } = setUp();

    act(() => {
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
