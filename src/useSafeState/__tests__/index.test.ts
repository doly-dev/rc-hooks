import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useSafeState } from 'rc-hooks';

describe('useSafeState', () => {
  const setUp = <T = any>(initialState: T) =>
    renderHook(() => {
      const [state, setState] = useSafeState(initialState);

      return {
        state,
        setState
      };
    });

  it('initialState', () => {
    const { result } = setUp(0);

    expect(result.current.state).toBe(0);
  });

  it('update state', async () => {
    const { result } = setUp(0);

    await act(async () => {
      result.current.setState(5);
    });

    expect(result.current.state).toBe(5);
  });

  it('not update when unmounted', async () => {
    const { result, unmount } = setUp(0);

    unmount();
    await act(async () => {
      result.current.setState(5);
    });

    expect(result.current.state).toBe(0);
  });

  it('type', async () => {
    const { result, unmount } = renderHook(() => {
      return useSafeState(0);
    });

    unmount();
    await act(async () => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(0);
  });
});
