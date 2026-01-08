import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { useSetState } from 'rc-hooks';

describe('useSetState', () => {
  it('work', async () => {
    const { result } = renderHook(() => {
      return useSetState<Record<string, any>>({
        foo: 0,
        bar: ''
      });
    });

    expect(result.current[0]).toEqual({ foo: 0, bar: '' });

    await act(async () => {
      result.current[1]({ bar: 'biz' });
    });
    expect(result.current[0]).toEqual({ foo: 0, bar: 'biz' });

    await act(async () => {
      result.current[1]({ foo: 42 });
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    await act(async () => {
      result.current[1]({});
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    // input error is not work
    await act(async () => {
      result.current[1](undefined as any);
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    await act(async () => {
      result.current[1](null as any);
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    await act(async () => {
      result.current[1]('13243' as any);
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz' });

    // new key value
    await act(async () => {
      result.current[1]({ a: 1 });
    });
    expect(result.current[0]).toEqual({ foo: 42, bar: 'biz', a: 1 });
  });
});
