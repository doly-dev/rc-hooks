import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import type { DebounceSettings } from 'lodash';
import { useDebounceFn } from '../..';

function waitTime(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
const setUp = (wait = 300, options?: DebounceSettings) => renderHook(() => {
  const [count, setCount] = useState(0);
  const { run, cancel } = useDebounceFn(setCount, wait, options);
  return {
    count,
    setCount: run,
    cancel
  }
});

describe('useDebounceFn', () => {
  it('should be defined', () => {
    expect(useDebounceFn).toBeDefined();
  });

  it('should work', async () => {
    const { result } = setUp();

    await act(async () => {
      result.current.setCount(2);
      await waitTime(50);
      expect(result.current.count).toBe(0);

      result.current.setCount(1);
      expect(result.current.count).toBe(0);
      await waitTime(350);
      expect(result.current.count).toBe(1);

      result.current.setCount(4);
      expect(result.current.count).toBe(1);
      await waitTime(300);
      expect(result.current.count).toBe(4);

      result.current.setCount(6);
      expect(result.current.count).toBe(4);
      result.current.cancel();
      await waitTime(300);
      expect(result.current.count).toBe(4);
    });

  });
});