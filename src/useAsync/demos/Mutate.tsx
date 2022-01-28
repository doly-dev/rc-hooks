/**
 * title: 突变
 * desc: 你可以通过 `mutate` ，直接修改 `data` 。 `mutate` 函数参数可以为 `newData` 或 `(oldData)=> newData` 。
 */

import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import { useAsync } from 'rc-hooks';
import getUsername from './services/getUsername';

function changeUsername(username: string) {
  console.log(username);
  return new Promise<{ success: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

function Demo() {
  const [state, setState] = useState('');
  const { data, mutate } = useAsync(getUsername, {
    onSuccess: (result) => {
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
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <Button onClick={() => run(state)} loading={loading}>
        Edit
      </Button>
    </div>
  );
}

export default Demo;
