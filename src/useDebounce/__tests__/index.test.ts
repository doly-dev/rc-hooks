import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../..';

describe('useDebounce', () => {
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
    expect(useDebounce).toBeDefined();
  });

  it('should work', async () => {
    const { result } = renderHook(() => {
      const [state, setState] = useState(0);
      const debounceState = useDebounce(state, 300);
      return {
        debounceState,
        state,
        setState
      };
    });

    act(() => {
      result.current.setState(1);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.debounceState).toBe(0);

    act(() => {
      // 因为延迟处理 state 所以要放在 act 中
      jest.advanceTimersByTime(300);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.debounceState).toBe(1);
  });

  it('should cancel function call on unmount', async () => {
    const { result, unmount } = renderHook(() => {
      const [state, setState] = useState(0);
      const debounceState = useDebounce(state, 300);
      return {
        debounceState,
        state,
        setState
      };
    });

    act(() => {
      result.current.setState(1);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.debounceState).toBe(0);

    unmount();

    jest.advanceTimersByTime(300);

    expect(result.current.state).toBe(1);
    expect(result.current.debounceState).toBe(0);
  });
});
