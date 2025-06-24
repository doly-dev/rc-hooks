import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useUpdate } from 'rc-hooks';

describe('useUpdate', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useUpdate());

    expect(typeof result.current).toBe('function');
  });

  it('should re-render component each time returned function is called', async () => {
    let renders = 0;
    const { result } = renderHook(() => {
      renders++;
      return useUpdate();
    });

    expect(renders).toBe(1);

    await act(async () => result.current());
    expect(renders).toBe(2);

    await act(async () => result.current());
    expect(renders).toBe(3);
  });
});
