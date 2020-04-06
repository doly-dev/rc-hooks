/**
 * title: 屏幕聚焦重新请求
 * desc: 如果你设置了 `options.refreshOnWindowFocus = true` ，则在浏览器窗口 `refocus` 和 `revisible` 时，会重新发起请求。你可以通过设置 `options.focusTimespan` 来设置请求间隔，默认为 `5000ms` 。
 */

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
