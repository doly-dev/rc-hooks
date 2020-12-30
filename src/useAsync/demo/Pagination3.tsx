/**
 * title: Ant Table
 */

import React from 'react';
import { Button, Table } from 'antd';
import usePagination from './hooks/usePagination';

import getUserList from './services/getUserList';

export default () => {
  const { refresh, data, loading, pagination, onTableChange } = usePagination(getUserList);

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [
        {
          text: 'male',
          value: 'male',
        },
        {
          text: 'female',
          value: 'female',
        },
      ]
    },
  ];

  return (
    <div>
      <Button onClick={refresh} style={{ marginBottom: 16 }}>刷新</Button>
      <Table
        dataSource={data || []}
        columns={columns}
        pagination={pagination}
        onChange={onTableChange}
        loading={loading}
        rowKey="id"
        bordered
      />
    </div>
  );
};
