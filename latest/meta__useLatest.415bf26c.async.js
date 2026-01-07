"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[3254],{84933:function(r,t,n){var o;n.r(t),n.d(t,{demos:function(){return h}});var l=n(90228),a=n.n(l),m=n(87999),c=n.n(m),s=n(75271),d=n(51370),_=n(20231),h={"src-use-latest-demo-basic":{component:s.memo(s.lazy(function(){return Promise.all([n.e(8883),n.e(6920),n.e(3811),n.e(2518),n.e(2433)]).then(n.bind(n,98615))})),asset:{type:"BLOCK",id:"src-use-latest-demo-basic",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(23609).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.29.3"},"rc-hooks":{type:"NPM",value:"3.2.0"}},entry:"index.tsx"},context:{react:o||(o=n.t(s,2)),antd:d,"rc-hooks":_},renderOpts:{compile:function(){var i=c()(a()().mark(function E(){var u,f=arguments;return a()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(1620),n.e(1540)]).then(n.bind(n,41540));case 2:return e.abrupt("return",(u=e.sent).default.apply(u,f));case 3:case"end":return e.stop()}},E)}));function p(){return i.apply(this,arguments)}return p}()}}}},35321:function(r,t,n){n.r(t),n.d(t,{texts:function(){return o}});const o=[{value:"\u8FD4\u56DE\u6700\u65B0\u7684 state \u6216 props \u3002",paraId:0,tocIndex:0},{value:`const latestValue = useLatest(value);
`,paraId:1,tocIndex:2}]},23609:function(r,t){t.Z=`import * as React from 'react';
import { Space, Button } from 'antd';
import { useLatest } from 'rc-hooks';

function Demo() {
  const [count, setCount] = React.useState(0);
  const latestCount = useLatest(count);

  const timer = React.useRef<any>(null);

  const handleAlertClick = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      alert(\`\u6700\u65B0\u7684 count \u503C\u4E3A\uFF1A\${latestCount.current}\`);
    }, 3000);
  };

  return (
    <div>
      <p>\u70B9\u51FB {count} \u6B21</p>
      <Space>
        <Button type="primary" onClick={() => setCount(count + 1)}>
          \u70B9\u6211
        </Button>
        <Button onClick={handleAlertClick}>\u70B9\u51FB3\u79D2\u540E\u5F39\u7A97\u663E\u793A\u70B9\u51FB\u6B21\u6570</Button>
      </Space>
    </div>
  );
}

export default Demo;
`}}]);
