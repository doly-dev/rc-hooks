/**
 * title: 基本用法
 */

import React from "react";
import { Button, Spin, List, Typography } from "antd";
import { useLoadMore } from 'rc-hooks';

import getUserList from "./services/getUserList";

type DataItem = { id: string; name: string }

type Result = {
  list: DataItem[];
  total: number;
}

export default () => {
  const { data, loading, loadingMore, noMore, loadMore } = useLoadMore<Result>(({ current }) => getUserList({ current }), {
    formatResult: res => ({
      ...res,
      list: res.data
    }),
    isNoMore: d => d.list.length >= d.total
  });

  return (
    <div>
      <Spin spinning={loading && !loadingMore}>
        <List
          dataSource={data?.list}
          renderItem={(item: { id: string; name: string }) => (
            <List.Item key={item.id}>
              <Typography.Text mark>[{item.id}]</Typography.Text> {item.name}
            </List.Item>
          )}
        />
      </Spin>
      <Button onClick={loadMore} loading={loadingMore} disabled={noMore}>
        {noMore ? 'No more data' : 'Click to load more'}
      </Button>
    </div>
  );
};
