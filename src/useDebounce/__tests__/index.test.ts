import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../..';

function waitTime(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

describe('useDebounce', () => {
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
      }
    });

    expect(result.current.state).toBe(0);
    expect(result.current.debounceState).toBe(0);

    act(() => {
      result.current.setState(1);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.debounceState).toBe(0);

    await waitTime(320);
    expect(result.current.state).toBe(1);
    expect(result.current.debounceState).toBe(1);

    // again
    act(() => {
      result.current.setState(2);
    });

    expect(result.current.state).toBe(2);
    expect(result.current.debounceState).toBe(1);

    await waitTime(320);
    expect(result.current.state).toBe(2);
    expect(result.current.debounceState).toBe(2);
  });

});