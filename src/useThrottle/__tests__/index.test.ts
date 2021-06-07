import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import type { ThrottleSettings } from 'lodash';
import { useThrottle } from '../..';

function waitTime(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
const setUp = (wait = 300, options?: ThrottleSettings) => renderHook(() => {
  const [value, setValue] = useState(0);
  const throttleValue = useThrottle(value, wait, options);
  return {
    value,
    setValue,
    throttleValue
  }
});

describe('useThrottle', () => {
  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('should work', async () => {
    const { result } = setUp();

    expect(result.current.value).toBe(0);
    expect(result.current.throttleValue).toBe(0);

    await act(async () => {
      result.current.setValue(1);
      await waitTime(350);
      expect(result.current.value).toBe(1);
      expect(result.current.throttleValue).toBe(1);

      result.current.setValue(2);
      await waitTime(100);
      expect(result.current.value).toBe(2);
      expect(result.current.throttleValue).toBe(2);

      result.current.setValue(3);
      await waitTime(100);
      expect(result.current.value).toBe(3);
      expect(result.current.throttleValue).toBe(2);

      result.current.setValue(4);
      await waitTime(100);
      expect(result.current.value).toBe(4);
      expect(result.current.throttleValue).toBe(4);
    });
  });
});