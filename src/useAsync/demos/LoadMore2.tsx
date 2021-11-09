/**
 * title: 上拉加载更多
 * desc: 如果 `options` 中存在 `ref` ，在滚动到底部时，自动触发 `loadMore` 。通过设置 `isNoMore`, 让 `useLoadMore` 知道何时停止。
 */

import { Button, List } from 'antd';
import React, { useRef } from 'react';
import { useLoadMore } from 'rc-hooks';

import getUserList from './services/getUserList';

type DataItem = { id: string; name: string };

type Result = {
  list: DataItem[];
  total: number;
};

export default () => {
  const containerRef = useRef(null);
  const { data, loading, loadingMore, refresh, loadMore, noMore } = useLoadMore<Result>(
    async ({ current }) => {
      const res = await getUserList({ current, pageSize: 3 });
      return {
        total: res.total,
        list: res.data
      };
    },
    {
      ref: containerRef,
      isNoMore: (result) => result?.list.length >= result?.total
    }
  );

  const renderFooter = () => (
    <div>
      {!noMore && (
        <Button onClick={loadMore} loading={loadingMore}>
          {loadingMore ? 'Loading more' : 'Click to load more'}
        </Button>
      )}

      {noMore && <span>No more data</span>}

      <span style={{ float: 'right', fontSize: 12 }}>total: {data?.total}</span>
    </div>
  );

  return (
    <div ref={containerRef} style={{ height: 300, overflowY: 'auto' }}>
      <List
        header={
          <Button onClick={refresh} loading={loading}>
            {loading ? 'loading' : 'Reload'}
          </Button>
        }
        footer={renderFooter()}
        loading={loading && !loadingMore}
        bordered
        dataSource={data?.list}
        renderItem={(item: { name: string }) => (
          <List.Item>
            <List.Item.Meta
              title={<a>{item.name}</a>}
              description="rc-hooks is a react hooks library"
            />
          </List.Item>
        )}
      />
    </div>
  );
};
