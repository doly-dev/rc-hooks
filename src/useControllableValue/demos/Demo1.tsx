/**
 * title: 非受控组件
 * desc: props 中没有 value ，则组件内部自己赋值
 */
import * as React from 'react';
import { useControllableValue } from 'rc-hooks';

const Demo: React.FC = (props: any) => {
  const [state, setState] = useControllableValue(props, {
    defaultValue: ''
  });

  return (
    <div>
      <input type='text' value={state} onChange={e => setState(e.target.value)} placeholder='请输入' />
      <button onClick={() => setState('')}>清空</button>
    </div>
  );
}

export default Demo;