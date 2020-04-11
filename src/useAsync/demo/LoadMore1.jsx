/**
 * title: 基本用法
 */

import React from 'react';
import { Button, Spin, List, Typography } from 'antd';
import Mock from 'mockjs';
import useLoadMore from "./useLoadMore";

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
      total: 10,
      pages: 2
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
  const { data, loading, loadingMore, done, loadMore } = useLoadMore(getUserList, {
    defaultPageSize: 5
  });

  return (
    <div>
      <Spin spinning={loading}>
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <Typography.Text mark>[{item.id}]</Typography.Text> {item.name}
            </List.Item>
          )}
        />
      </Spin>
      <Button
        onClick={() => loadMore()}
        loading={loadingMore}
        disabled={done}
      >
        click to load more
      </Button>
    </div>
  );
};
