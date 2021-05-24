/**
 * title: 受控组件
 * desc: props 中有 value ，则由父级控制 state
 */
import * as React from 'react';
import { useControllableValue } from 'rc-hooks';

const ControllableComponent: React.FC<any> = (props: any) => {
  const [state, setState] = useControllableValue(props, {
    defaultValue: ''
  });

  return <input type='text' value={state} onChange={e => setState(e.target.value)} placeholder='请输入' />
}

const Demo: React.FC = () => {
  const [state, setState] = React.useState('');

  return (
    <div>
      <ControllableComponent value={state} onChange={setState} />
      <button onClick={() => setState('')}>清空</button>
    </div>
  );
}

export default Demo;