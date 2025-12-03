"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[5720],{71456:function(s,e,n){var t;n.r(e),n.d(e,{demos:function(){return I}});var d=n(90228),r=n.n(d),l=n(87999),m=n.n(l),a=n(75271),c=n(14962),_=n(78389),I={"src-use-mount-demo-demo1":{component:a.memo(a.lazy(function(){return Promise.all([n.e(8883),n.e(2869),n.e(8941),n.e(5845),n.e(2433)]).then(n.bind(n,32856))})),asset:{type:"BLOCK",id:"src-use-mount-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(44398).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.29.1"},"rc-hooks":{type:"NPM",value:"3.1.1"}},entry:"index.tsx"},context:{react:t||(t=n.t(a,2)),antd:c,"rc-hooks":_},renderOpts:{compile:function(){var v=m()(r()().mark(function p(){var u,f=arguments;return r()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([n.e(1620),n.e(3245)]).then(n.bind(n,93245));case 2:return o.abrupt("return",(u=o.sent).default.apply(u,f));case 3:case"end":return o.stop()}},p)}));function h(){return v.apply(this,arguments)}return h}()}}}},23395:function(s,e,n){n.r(e),n.d(e,{texts:function(){return t}});const t=[{value:"\u53EA\u5728\u7EC4\u4EF6 mount \u65F6\u6267\u884C\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`useMount(fn: () => void);
`,paraId:1,tocIndex:3},{value:"\u53C2\u6570",paraId:2,tocIndex:4},{value:"\u8BF4\u660E",paraId:2,tocIndex:4},{value:"\u7C7B\u578B",paraId:2,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:4},{value:"fn",paraId:2,tocIndex:4},{value:"\u7EC4\u4EF6 ",paraId:2,tocIndex:4},{value:"mount",paraId:2,tocIndex:4},{value:" \u65F6\u6267\u884C\u7684\u51FD\u6570\u3002",paraId:2,tocIndex:4},{value:"function",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4}]},44398:function(s,e){e.Z=`import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useMount } from 'rc-hooks';

const MyComponent = () => {
  useMount(() => {
    message.info('mount');
  });

  return <div>Hello World</div>;
};

function Demo() {
  const [state, toggle] = useState(false);

  return (
    <>
      <Button onClick={() => toggle((s) => !s)}>{state ? 'unmount' : 'mount'}</Button>
      {state && <MyComponent />}
    </>
  );
}

export default Demo;
`}}]);
