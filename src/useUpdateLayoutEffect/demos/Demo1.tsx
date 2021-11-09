/**
 * title: 基础用法
 * desc: 使用上与 useLayoutEffect 完全相同，只是它忽略了首次渲染，且只在依赖项更新时运行。
 */

import { Button } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { useUpdateLayoutEffect } from 'rc-hooks';

export default () => {
  const [count, setCount] = useState(0);
  const [layoutEffectCount, setLayoutEffectCount] = useState(0);
  const [updateLayoutEffectCount, setUpdateLayoutEffectCount] = useState(0);

  useLayoutEffect(() => {
    setLayoutEffectCount((c) => c + 1);
  }, [count]);

  useUpdateLayoutEffect(() => {
    setUpdateLayoutEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>layoutEffectCount: {layoutEffectCount}</p>
      <p>updateLayoutEffectCount: {updateLayoutEffectCount}</p>
      <p>
        <Button type="primary" onClick={() => setCount((c) => c + 1)}>
          reRender
        </Button>
      </p>
    </div>
  );
};
