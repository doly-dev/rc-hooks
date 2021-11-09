import { renderHook, act } from '@testing-library/react-hooks';
import useUpdate from '..';

describe('useUpdate', () => {
  it('should be defined', () => {
    expect(useUpdate).toBeDefined();
  });

  it('should return a function', () => {
    const { result } = renderHook(() => useUpdate());

    expect(typeof result.current).toBe('function');
  });

  it('should re-render component each time returned function is called', () => {
    let renders = 0;
    const { result } = renderHook(() => {
      renders++;
      return useUpdate();
    });

    expect(renders).toBe(1);

    act(() => result.current());
    expect(renders).toBe(2);

    act(() => result.current());
    expect(renders).toBe(3);
  });
});
