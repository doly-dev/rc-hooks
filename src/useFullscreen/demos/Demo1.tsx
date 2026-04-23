import React, { useRef } from 'react';
import { useFullscreen } from 'rc-hooks';

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggle } = useFullscreen(ref);

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: '300px',
          height: '300px',
          background: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <div style={{ marginBottom: '20px' }}>点击按钮切换全屏</div>
        <button onClick={toggle} style={{ marginBottom: '20px' }}>
          {isFullscreen ? '退出全屏' : '进入全屏'}
        </button>
        <div>当前状态: {isFullscreen ? '全屏' : '非全屏'}</div>
      </div>
    </div>
  );
};
