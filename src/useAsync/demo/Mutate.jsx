import { useAsync } from 'rc-hooks';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import Mock from 'mockjs';

function getUsername() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

function changeUsername(username) {
  console.log(username);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');
  const { data, mutate } = useAsync(getUsername, {
    onSuccess: result => {
      setState(result);
    }
  });
  const { loading, run } = useAsync(changeUsername, {
    autoRun: false,
    onSuccess: (result, params) => {
      if (result.success) {
        mutate(params[0]);
        message.success(`The username was changed to "${params[0]}" !`);
      }
    }
  });

  return (
    <div>
      <p>usrename: {data}</p>
      <Input
        onChange={e => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <Button onClick={() => run(state)} loading={loading}>
        Edit
      </Button>
    </div>
  );
};
