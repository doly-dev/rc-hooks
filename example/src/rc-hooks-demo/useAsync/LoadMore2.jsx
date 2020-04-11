import { Avatar, Button, List } from 'antd';
import React, { useRef } from 'react';
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
      total: 30,
      pages: 3
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
  const containerRef = useRef(null);
  const { data, loading, loadingMore, reload, loadMore, done, pagination } = useLoadMore(getUserList, {
    ref: containerRef
  });

  const renderFooter = () => (
    <>
      {!done && (
        <Button onClick={loadMore} loading={loadingMore}>
          {loadingMore ? 'Loading more' : 'Click to load more'}
        </Button>
      )}

      {done && <span>No more data</span>}

      <span style={{ float: 'right', fontSize: 12 }}>total: {pagination.total}</span>
    </>
  );

  return (
    <div ref={containerRef} style={{ height: 300, overflowY: 'auto' }}>
      <List
        header={
          <Button onClick={reload} loading={loading}>
            Reload
          </Button>
        }
        footer={!loading && renderFooter()}
        loading={loading}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a>{item.name}</a>}
              description="rc-hooks is a react hooks library"
            />
          </List.Item>
        )}
      />
    </div>
  );
};
