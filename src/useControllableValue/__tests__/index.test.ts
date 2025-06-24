import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useControllableValue } from 'rc-hooks';

describe('useControllableValue', () => {
  it('deufaltValue should work', () => {
    const { result } = renderHook(() => useControllableValue({ defaultValue: 1 }));
    expect(result.current[0]).toBe(1);
  });

  it('value should work', () => {
    const { result } = renderHook(() => useControllableValue({ defaultValue: 1, value: 2 }));
    expect(result.current[0]).toBe(2);
  });

  it('defualt value is undefined', () => {
    const { result } = renderHook(() => useControllableValue());
    expect(result.current[0]).toBeUndefined();
  });

  it('onChange should work', async () => {
    let extraParam = '';
    const props = {
      value: 2,
      onChange(v: number, extra: string) {
        this.value = v;
        extraParam = extra;
      }
    };
    const { result } = renderHook(() => useControllableValue(props));
    expect(result.current[0]).toEqual(2);
    await act(async () => {
      result.current[1](3, 'extraParam');
    });
    expect(props.value).toEqual(3);
    expect(extraParam).toEqual('extraParam');
  });

  it('test on state update', () => {
    const props = {
      value: 1
    };
    const { result, rerender } = renderHook(() => useControllableValue(props));
    expect(result.current[0]).toBe(1);

    props.value = 2;
    rerender(props);
    expect(result.current[0]).toBe(2);

    props.value = 3;
    rerender(props);
    expect(result.current[0]).toBe(3);
  });

  it('test set state', async () => {
    const { result } = renderHook(() => useControllableValue());
    expect(result.current[0]).toBeUndefined();

    await act(async () => {
      result.current[1](null);
    });
    expect(result.current[0]).toBeNull();

    await act(async () => {
      result.current[1](1);
    });
    expect(result.current[0]).toBe(1);

    await act(async () => {
      result.current[1]((prevState: number) => prevState + 1);
    });
    expect(result.current[0]).toBe(2);
  });

  it('type interface should work', () => {
    const props = {
      value: {
        foo: 42
      }
    };
    const { result } = renderHook(() => {
      return useControllableValue(props);
    });

    // value 有类型限制
    const [value] = result.current;
    expect(value).toEqual({ foo: 42 });
  });

  it('set alias', async () => {
    const props = {
      foo: 42,
      changeFoo(v: number) {
        this.foo = v;
      }
    };
    const { result } = renderHook(() =>
      useControllableValue<number>(props, {
        valuePropName: 'foo',
        trigger: 'changeFoo'
      })
    );
    expect(result.current[0]).toBe(42);

    await act(async () => {
      result.current[1](result.current[0] + 1);
    });
    expect(props.foo).toBe(43);
  });
});
