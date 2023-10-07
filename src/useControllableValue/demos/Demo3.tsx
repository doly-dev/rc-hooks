/**
 * desc: props 中有 onChange ，则在 state 变化时，就会触发 onChange
 */
import * as React from 'react';
import { useControllableValue } from 'rc-hooks';

const ControllableComponent: React.FC<any> = (props: any) => {
  const [state, setState] = useControllableValue(props, { defaultValue: '' });

  return (
    <input
      type="text"
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder="请输入"
    />
  );
};

const Demo: React.FC = () => {
  const [state, setState] = React.useState('');

  return (
    <div>
      <p>state: {state}</p>
      <ControllableComponent onChange={setState} />
    </div>
  );
};

export default Demo;
