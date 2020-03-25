import { useAsync } from 'rc-hooks';
import { Spin } from 'antd';
import React from 'react';
import Mock from 'mockjs';

function getUsername() {
  const userInfo = Mock.mock('@name');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userInfo);
    }, 1000);
  });
}

export default () => {
  const { data, loading } = useAsync(getUsername, {
    refreshOnWindowFocus: true
  })

  return (
    <div>
      <p>You can try to click elsewhere and click back to try. (Or hide the page and show it again)</p>
      <Spin spinning={loading}>
        <div>Username: {data}</div>
      </Spin>
    </div>
  )
}
