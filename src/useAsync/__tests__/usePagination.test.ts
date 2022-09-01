import { act, renderHook, waitFor } from '@testing-library/react';
import usePagination from '../usePagination';
import getList from '../demos/services/getList';

describe('usePagination', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('should be defined', () => {
    expect(usePagination).toBeDefined();
  });

  it('work', async () => {
    const { result } = renderHook(() => usePagination(({ current, pageSize }) => {
      return getList({
        current,
        pageSize
      }).then(res => ({
        list: res.data,
        total: res.total
      }));
    }));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 0 });
    expect(result.current.tableProps).toMatchObject({ loading: true, pagination: { current: 1, pageSize: 10, total: 0 } });
    expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data?.list.length).toBe(10);
      expect(result.current.data?.total).toBe(15);
      expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 15 });
      expect(result.current.tableProps).toMatchObject({ loading: false, pagination: { current: 1, pageSize: 10, total: 15 } });
      expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);
    });

    act(() => {
      result.current.run({
        current: 2,
        pageSize: 10,
        other: ''
      });
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data?.list.length).toBe(10);
      expect(result.current.data?.total).toBe(15);
      expect(result.current.pagination).toMatchObject({ current: 2, pageSize: 10, total: 15 });
      expect(result.current.tableProps).toMatchObject({ loading: true, pagination: { current: 2, pageSize: 10, total: 15 } });
      expect(result.current.params).toEqual([{ current: 2, pageSize: 10, other: '' }]);
    });

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data?.list.length).toBe(5);
      expect(result.current.data?.total).toBe(15);
      expect(result.current.pagination).toMatchObject({ current: 2, pageSize: 10, total: 15 });
      expect(result.current.tableProps).toMatchObject({ loading: false, pagination: { current: 2, pageSize: 10, total: 15 } });
      expect(result.current.params).toEqual([{ current: 2, pageSize: 10, other: '' }]);
    });
  });

  it('cancel and refresh', async () => {
    const { result } = renderHook(() => usePagination(({ current, pageSize }) => {
      return getList({
        current,
        pageSize
      }).then(res => ({
        list: res.data,
        total: res.total
      }));
    }));

    act(() => {
      result.current.cancel();
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeUndefined();
      expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 0 });
      expect(result.current.tableProps).toMatchObject({ loading: false, pagination: { current: 1, pageSize: 10, total: 0 } });
      expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);
    });

    act(() => {
      result.current.refresh();
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeUndefined();
      expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 0 });
      expect(result.current.tableProps).toMatchObject({ loading: true, pagination: { current: 1, pageSize: 10, total: 0 } });
      expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);
    });

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data?.list.length).toBe(10);
      expect(result.current.data?.total).toBe(15);
      expect(result.current.pagination).toMatchObject({ current: 1, pageSize: 10, total: 15 });
      expect(result.current.tableProps).toMatchObject({ loading: false, pagination: { current: 1, pageSize: 10, total: 15 } });
      expect(result.current.params).toEqual([{ current: 1, pageSize: 10 }]);
    });
  })

});
