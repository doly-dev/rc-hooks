import React from 'react';
import { List, Pagination } from 'antd';
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
  const { data, loading, pagination, changePagination } = usePagination(getUserList);

  return (
    <div>
      <List
        dataSource={data || []}
        loading={loading}
        renderItem={item => (
          <List.Item>
            {item.name} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...pagination}
        showSizeChanger
        onChange={(current, pageSize) => changePagination({ current, pageSize })}
        onShowSizeChange={(current, pageSize) => changePagination({ current, pageSize })}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );
};
