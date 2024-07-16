import { act } from 'react';
import { renderHook } from '@testing-library/react';
import useLoadMore from '../useLoadMore';
import getList from '../demos/services/getList';

describe('useLoadMore', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('work', async () => {
    const { result } = renderHook(() =>
      useLoadMore(
        ({ current }) => {
          return getList({ current, pageSize: 5 }).then((res) => ({
            list: res.data,
            total: res.total
          }));
        },
        {
          isNoMore: (result) => !!result && result.list.length >= result.total
        }
      )
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.params).toEqual([{ current: 1 }]);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data?.list.length).toBe(5);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 1 }]);

    await act(async () => {
      result.current.loadMore();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.loadingMore).toBe(true);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data?.list.length).toBe(5);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 2 }]);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data?.list.length).toBe(10);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 2 }]);

    await act(async () => {
      result.current.loadMore();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.loadingMore).toBe(true);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data?.list.length).toBe(10);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 3 }]);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(true);
    expect(result.current.data?.list.length).toBe(15);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 3 }]);

    // 没有更多了，不触发异步
    await act(async () => {
      result.current.loadMore();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(true);
    expect(result.current.data?.list.length).toBe(15);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 3 }]);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(true);
    expect(result.current.data?.list.length).toBe(15);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 3 }]);
  });

  it('cancel and refresh', async () => {
    const { result } = renderHook(() =>
      useLoadMore(
        ({ current }) => {
          return getList({ current, pageSize: 5 }).then((res) => ({
            list: res.data,
            total: res.total
          }));
        },
        {
          isNoMore: (result) => !!result && result.list.length >= result.total
        }
      )
    );

    await act(async () => {
      result.current.cancel();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.params).toEqual([{ current: 1 }]);

    await act(async () => {
      result.current.run({ current: 1 });
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.params).toEqual([{ current: 1 }]);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data?.list.length).toBe(5);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 1 }]);

    await act(async () => {
      result.current.loadMore();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.loadingMore).toBe(true);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data?.list.length).toBe(5);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 2 }]);

    await act(async () => {
      result.current.cancel();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data?.list.length).toBe(5);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 1 }]);

    await act(async () => {
      result.current.refresh();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.loadingMore).toBe(false);
    expect(result.current.noMore).toBe(false);
    expect(result.current.data?.list.length).toBe(0);
    expect(result.current.data?.total).toBe(15);
    expect(result.current.params).toEqual([{ current: 1 }]);
  });
});
