/**
 * title: Ant Table
 * desc: 尝试设置排序和筛选，查看参数变化
 */

import React from 'react';
import { Button, Table } from 'antd';
import { usePagination } from 'rc-hooks';
import getUserList from './services/getUserList';

function Demo() {
  const { refresh, tableProps } = usePagination(
    ({ current, pageSize, ...rest }) => {
      console.log(rest);
      return getUserList({ current, pageSize }).then((res) => ({
        list: res.data,
        total: res.total
      }));
    },
    {
      // autoRun: false
    }
  );

  const columns = [
    {
      title: 'name',
      dataIndex: 'name'
    },
    {
      title: 'email',
      dataIndex: 'email'
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
          value: 'male'
        },
        {
          text: 'female',
          value: 'female'
        }
      ]
    }
  ];

  return (
    <div>
      <Button onClick={refresh} style={{ marginBottom: 16 }}>
        刷新
      </Button>
      <Table {...tableProps} columns={columns} rowKey="id" bordered />
    </div>
  );
}

export default Demo;
