import { useState, act } from 'react';
import { renderHook } from '@testing-library/react';
import { useDebounce } from 'rc-hooks';

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

    await act(async () => {
      result.current.setState(1);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.debounceState).toBe(0);

    await act(async () => {
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

    await act(async () => {
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
