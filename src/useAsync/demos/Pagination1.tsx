/**
 * title: 普通分页
 */

import React from 'react';
import { List, Pagination } from 'antd';
import usePagination from './hooks/usePagination';

import getUserList from './services/getUserList';

export default () => {
  const { data, loading, pagination, onTableChange } = usePagination<{ data: { name: string; email: string; }[] }>(getUserList);

  return (
    <div>
      <List
        dataSource={data || []}
        loading={loading}
        renderItem={(item: { name: string, email: string }) => (
          <List.Item>
            {item.name} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...pagination}
        onChange={(current, pageSize) => onTableChange({ current, pageSize })}
        onShowSizeChange={(current, pageSize) => onTableChange({ current, pageSize })}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );
};
