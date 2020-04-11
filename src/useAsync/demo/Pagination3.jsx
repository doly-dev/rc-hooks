/**
 * title: Ant Table
 */

import React from 'react';
import { Button, Table } from 'antd';
import Mock from 'mockjs';

import usePagination from "./usePagination";

const userList = ({ page: { pageNum, pageSize }, data = {} }) => (
  Mock.mock({
    [`data|${pageSize}`]: [{
      id: '@guid',
      name: '@cname',
      'gender|1': ['male', 'female'],
      email: '@email',
      disabled: false
    }],
    pageInfo: {
      total: 55,
      pages: 10
    },
    errCode: "00",
    errMsg: ""
  })
)

function getUserList(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userList(params))
    }, 1000)
  });
}

export default () => {
  const { run, refresh, data, loading, pagination, changePagination } = usePagination(getUserList, { defaultPageSize: 5 });

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
        pagination={{...pagination, showSizeChanger: false}}
        onChange={(page, filters, sorter) => {
          if (page.current === pagination.current && page.pageSize === pagination.pageSize) {
            run({
              sorter: {
                [sorter.field]: sorter.order
              },
              filters
            });
          } else {
            changePagination(page);
          }
        }}
        loading={loading}
        rowKey="id"
        bordered
      />
    </div>
  );
};
