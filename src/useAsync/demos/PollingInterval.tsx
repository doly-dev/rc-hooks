/**
 * desc: |
 *  通过设置 `options.pollingInterval` ，进入轮询模式，定时触发函数执行。
 *
 *  - 通过设置 `options.pollingWhenHidden=false` ，在屏幕不可见时，暂时暂停定时任务。
 *  - 通过 `run` / `cancel` 来 开启/停止 轮询。
 *  - 在 `options.autoRun=false` 时，需要第一次执行 `run` 后，才开始轮询。
 */

import React from 'react';
import { Button, Space, Spin } from 'antd';
import { useAsync } from 'rc-hooks';
import getUsername from './services/getUsername';

function Demo() {
  const { data, loading, run, cancel } = useAsync(getUsername, {
    pollingInterval: 1000,
    pollingWhenHidden: false
  });

  return (
    <>
      <Spin spinning={loading}>
        <p>Username: {data}</p>
      </Spin>
      <Space.Compact>
        <Button onClick={run}>start</Button>
        <Button onClick={cancel}>stop</Button>
      </Space.Compact>
    </>
  );
}

export default Demo;
