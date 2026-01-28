"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[6477],{99506:function(u,e,n){var t;n.r(e),n.d(e,{demos:function(){return I}});var d=n(90228),r=n.n(d),m=n(87999),l=n.n(m),a=n(75271),_=n(3201),c=n(4033),I={"src-use-unmount-demo-demo1":{component:a.memo(a.lazy(function(){return Promise.all([n.e(4920),n.e(6920),n.e(3811),n.e(674),n.e(2433)]).then(n.bind(n,12105))})),asset:{type:"BLOCK",id:"src-use-unmount-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(30541).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.29.3"},"rc-hooks":{type:"NPM",value:"3.3.0"}},entry:"index.tsx"},context:{react:t||(t=n.t(a,2)),antd:_,"rc-hooks":c},renderOpts:{compile:function(){var p=l()(r()().mark(function h(){var s,f=arguments;return r()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,n.e(7855).then(n.bind(n,57855));case 2:return o.abrupt("return",(s=o.sent).default.apply(s,f));case 3:case"end":return o.stop()}},h)}));function v(){return p.apply(this,arguments)}return v}()}}}},22532:function(u,e,n){n.r(e),n.d(e,{texts:function(){return t}});const t=[{value:"\u53EA\u5728\u7EC4\u4EF6 unmount \u65F6\u6267\u884C\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`useUnmount(fn: () => void);
`,paraId:1,tocIndex:3},{value:"\u53C2\u6570",paraId:2,tocIndex:4},{value:"\u8BF4\u660E",paraId:2,tocIndex:4},{value:"\u7C7B\u578B",paraId:2,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:4},{value:"fn",paraId:2,tocIndex:4},{value:"\u7EC4\u4EF6 ",paraId:2,tocIndex:4},{value:"unmount",paraId:2,tocIndex:4},{value:" \u65F6\u6267\u884C\u7684\u51FD\u6570\u3002",paraId:2,tocIndex:4},{value:"function",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4}]},30541:function(u,e){e.Z=`import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useUnmount } from 'rc-hooks';

const MyComponent = () => {
  useUnmount(() => {
    message.info('unmount');
  });

  return <div>Hello World</div>;
};

function Demo() {
  const [state, toggle] = useState(true);

  return (
    <>
      <Button onClick={() => toggle((s) => !s)}>{state ? 'unmount' : 'mount'}</Button>
      {state && <MyComponent />}
    </>
  );
}

export default Demo;
`}}]);
