/**
 * title: 修改列表
 */
import React from 'react';
import { Button, Spin, List, Typography } from 'antd';
import { useLoadMore } from 'rc-hooks';
import getUserList from './services/getUserList';

function Demo() {
  const { data, loading, loadingMore, noMore, loadMore, mutate } = useLoadMore(
    ({ current }) => getUserList({ current }).then((res) => ({ total: res.total, list: res.data })),
    {
      isNoMore: (result) => !!result && result.list.length >= result.total
    }
  );

  const removeItem = (id: string) => {
    mutate(d => {
      const index = d.list.findIndex(item => item.id === id);
      const newList = d.list.slice();
      newList.splice(index, 1);

      if (index !== -1) {
        return {
          ...d,
          list: newList
        }
      }

      return d;
    })
  }

  return (
    <div>
      <Spin spinning={loading && !loadingMore}>
        <List
          dataSource={data?.list}
          renderItem={(item: { id: string; name: string }) => (
            <List.Item key={item.id} actions={[<a key='delete' onClick={() => removeItem(item.id)}>删除</a>]}>
              <Typography.Text mark>[{item.id}]</Typography.Text> {item.name}
            </List.Item>
          )}
        />
      </Spin>
      <Button onClick={loadMore} loading={loadingMore} disabled={noMore || loading}>
        {noMore ? 'No more data' : 'Click to load more'}
      </Button>
    </div>
  );
}

export default Demo;
