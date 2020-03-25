import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'antd';

import { getDemoByName } from "~/rc-hooks-demo";

// import DemoDefault from "~/rc-hooks-demo/useAsync/DemoDefault";

export default (props) => {
  // console.log(props.match.params);
  const { name } = props.match.params;

  if (!name) {
    return '找不到对应组件';
  }

  const info = getDemoByName(name);

  if (!info) {
    return '找不到对应组件';
  }

  return (
    <div>
      <h2>{info.name}</h2>
      <p>{info.description}</p>
      {
        info.component && React.createElement(info.component)
      }
    </div>
  );
}
