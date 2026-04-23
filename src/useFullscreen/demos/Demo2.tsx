import React, { useRef, useState } from 'react';
import { useFullscreen } from 'rc-hooks';

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');

  const { isFullscreen, toggle } = useFullscreen(ref, {
    onEnter: () => {
      setMessage('进入全屏');
    },
    onExit: () => {
      setMessage('退出全屏');
    }
  });

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
        <div style={{ marginBottom: '20px' }}>当前状态: {isFullscreen ? '全屏' : '非全屏'}</div>
        <div style={{ color: '#666' }}>消息: {message}</div>
      </div>
    </div>
  );
};
