/**
 * title: 普通分页
 */

import React from 'react';
import { List, Pagination } from 'antd';
import { usePagination } from 'rc-hooks';
import getUserList from './services/getUserList';

export default () => {
  const { data, loading, pagination } = usePagination(({ current, pageSize }) => {
    console.log(current, pageSize);
    return getUserList({ current, pageSize }).then((res) => ({
      list: res.data,
      total: res.total
    }));
  });

  return (
    <div>
      <List
        dataSource={data?.list || []}
        loading={loading}
        renderItem={(item: { name: string; email: string }) => (
          <List.Item>
            {item.name} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...pagination}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={(current, pageSize) => pagination.changePageSize(pageSize)}
        showTotal={(total) => `共 ${total} 条数据`}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );
};
