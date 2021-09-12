/**
 * title: Loading Delay
 * desc: 通过设置 `options.loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止闪烁。
 */

import React from 'react';
import { Spin, Button } from 'antd';
import { useAsync } from 'rc-hooks';

function getCurrentTime() {
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(new Date().getTime())
    }, 100)
  })
}

export default () => {
  const getTimeAction = useAsync(getCurrentTime);

  const withLoadingDelayAction = useAsync(getCurrentTime, {
    loadingDelay: 200
  });

  const trigger = () => {
    getTimeAction.run();
    withLoadingDelayAction.run();
  }

  return (
    <div>
      <p>loadingDelay can set delay loading, which can effectively prevent loading from flickering.</p>
      <Button onClick={trigger}>
        run
      </Button>

      <div style={{ margin: '24px 0', width: 300 }}>
        <Spin spinning={getTimeAction.loading}>
          Double Count: {getTimeAction.data}
        </Spin>
      </div>
      <div>
        <Spin spinning={withLoadingDelayAction.loading}>
          Double Count: {withLoadingDelayAction.data}
        </Spin>
      </div>
    </div>
  );
};
