import { Button, List } from 'antd';
import React, { useRef } from 'react';
import { useLoadMore } from 'rc-hooks';

interface Item {
  id?: string;
  name: string;
}

interface Result {
  list: Item[];
  nextId?: string;
}

const resultData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export async function getLoadMoreList(nextId: any, limit: any): Promise<Result> {
  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end).map((id) => ({
    id,
    name: `project ${id} (server time: ${Date.now()})`
  }));
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId
      });
    }, 1000);
  });
}

export default () => {
  const containerRef = useRef<HTMLDivElement>();
  const currResult = useRef<Result>();
  const { data, loading, loadingMore, refresh, loadMore, noMore } = useLoadMore(
    ({ current }) => {
      return getLoadMoreList(current === 1 ? undefined : currResult.current?.nextId, 3);
    },
    {
      target: () => containerRef.current,
      isNoMore: (result) => !result?.nextId,
      onSuccess(res) {
        currResult.current = res;
      }
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
            <List.Item.Meta title={<a>{item.name}</a>} />
          </List.Item>
        )}
      />
    </div>
  );
};
