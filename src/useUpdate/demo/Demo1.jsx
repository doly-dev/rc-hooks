/**
 * title: 基本用法
 * desc: 点击按钮强制组件重新渲染
 */

import React from 'react';
import { Button } from 'antd';
import { useUpdate } from 'rc-hooks';

export default () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Button onClick={update} style={{ marginTop: 16 }}>update</Button>
    </>
  );
};
