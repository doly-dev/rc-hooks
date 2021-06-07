import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import type { ThrottleSettings } from 'lodash';
import { useThrottleFn } from '../..';

function waitTime(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
const setUp = (wait = 300, options?: ThrottleSettings) => renderHook(() => {
  const [count, setCount] = useState(0);
  const { run, cancel } = useThrottleFn((val) => setCount(x => x + val), wait, options);
  return {
    count,
    addCount: run,
    cancel
  }
});

describe('useThrottleFn', () => {
  it('should be defined', () => {
    expect(useThrottleFn).toBeDefined();
  });

  it('should work', async () => {
    const { result } = setUp();

    act(() => {
      result.current.addCount(1);
    });

    expect(result.current.count).toBe(1);

    await act(async () => {
      result.current.addCount(1);
      expect(result.current.count).toBe(1);
      await waitTime(300);
      expect(result.current.count).toBe(2);

      result.current.addCount(1);
      await waitTime(100);
      expect(result.current.count).toBe(3);
      result.current.addCount(1);
      await waitTime(100);
      expect(result.current.count).toBe(3);
      result.current.addCount(1);
      await waitTime(100);
      expect(result.current.count).toBe(4);
      await waitTime(300);
      expect(result.current.count).toBe(4);

      result.current.addCount(1);
      expect(result.current.count).toBe(5);
      await waitTime(100);
      result.current.addCount(1);
      expect(result.current.count).toBe(5);
      await waitTime(100);
      result.current.addCount(1);
      expect(result.current.count).toBe(5);
      result.current.cancel();
      await waitTime(300);
      expect(result.current.count).toBe(5);
    });

  });
});