import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { usePagination } from 'rc-hooks';
import getList from '../demos/services/getList';

describe('usePagination', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('work', async () => {
    const { result } = renderHook(() =>
      usePagination(({ current, pageSize }) => {
        return getList({
          current,
          pageSize
        }).then((res) => ({
          list: res.data,
          total: res.total
        }));
      })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 0 });
    expect(result.current.tableProps).toMatchObject({
      loading: true,
      pagination: { current: 1, pageSize: 10, total: 0 }
    });
    expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data?.list.length).toBe(10);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 15 });
    expect(result.current.tableProps).toMatchObject({
      loading: false,
      pagination: { current: 1, pageSize: 10, total: 15 }
    });
    expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);

    await act(async () => {
      result.current.run({
        current: 2,
        pageSize: 10,
        other: ''
      });
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.data?.list.length).toBe(10);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.pagination).toMatchObject({ current: 2, pageSize: 10, total: 15 });
    expect(result.current.tableProps).toMatchObject({
      loading: true,
      pagination: { current: 2, pageSize: 10, total: 15 }
    });
    expect(result.current.params).toEqual([{ current: 2, pageSize: 10, other: '' }]);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data?.list.length).toBe(5);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.pagination).toMatchObject({ current: 2, pageSize: 10, total: 15 });
    expect(result.current.tableProps).toMatchObject({
      loading: false,
      pagination: { current: 2, pageSize: 10, total: 15 }
    });
    expect(result.current.params).toEqual([{ current: 2, pageSize: 10, other: '' }]);
  });

  it('cancel and refresh', async () => {
    const { result } = renderHook(() =>
      usePagination(({ current, pageSize }) => {
        return getList({
          current,
          pageSize
        }).then((res) => ({
          list: res.data,
          total: res.total
        }));
      })
    );

    await act(async () => {
      result.current.cancel();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 0 });
    expect(result.current.tableProps).toMatchObject({
      loading: false,
      pagination: { current: 1, pageSize: 10, total: 0 }
    });
    expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);

    await act(async () => {
      result.current.refresh();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 0 });
    expect(result.current.tableProps).toMatchObject({
      loading: true,
      pagination: { current: 1, pageSize: 10, total: 0 }
    });
    expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data?.list.length).toBe(10);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 15 });
    expect(result.current.tableProps).toMatchObject({
      loading: false,
      pagination: { current: 1, pageSize: 10, total: 15 }
    });
    expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);
  });
});
