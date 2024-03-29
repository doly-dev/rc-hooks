import { renderHook, act } from '@testing-library/react';
import useSetState from '..';

describe('useSetState', () => {
  it('work', () => {
    const { result } = renderHook(() => {
      return useSetState({
        foo: 0,
        bar: ''
      });
    });

    expect(result.current[0]).toEqual({ foo: 0, bar: '' });

    act(() => {
      result.current[1]({ bar: 'biz' });
    });
    expect(result.current[0]).toEqual({ foo: 0, bar: 'biz' });

    act(() => {
      result.current[1]({ foo: 42 });
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    act(() => {
      result.current[1]({});
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });


    // input error is not work
    act(() => {
      result.current[1](undefined as any);
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    act(() => {
      result.current[1](null as any);
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    act(() => {
      result.current[1]('13243' as any);
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    // new key value
    act(() => {
      // @ts-ignore
      result.current[1]({ a: 1 });
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz', a: 1 });

  });

});