"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[5720],{34236:function(s,e,n){var t;n.r(e),n.d(e,{demos:function(){return I}});var d=n(90228),r=n.n(d),l=n(87999),m=n.n(l),a=n(75271),c=n(67670),_=n(61387),I={"src-use-mount-demo-demo1":{component:a.memo(a.lazy(function(){return Promise.all([n.e(8457),n.e(1458),n.e(4530),n.e(6888),n.e(2433)]).then(n.bind(n,51971))})),asset:{type:"BLOCK",id:"src-use-mount-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(63743).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.26.4"},"rc-hooks":{type:"NPM",value:"3.0.23"}},entry:"index.tsx"},context:{react:t||(t=n.t(a,2)),antd:c,"rc-hooks":_},renderOpts:{compile:function(){var v=m()(r()().mark(function p(){var u,f=arguments;return r()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([n.e(1620),n.e(9159)]).then(n.bind(n,29159));case 2:return o.abrupt("return",(u=o.sent).default.apply(u,f));case 3:case"end":return o.stop()}},p)}));function h(){return v.apply(this,arguments)}return h}()}}}},20791:function(s,e,n){n.r(e),n.d(e,{texts:function(){return t}});const t=[{value:"\u53EA\u5728\u7EC4\u4EF6 mount \u65F6\u6267\u884C\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`useMount(fn: () => void);
`,paraId:1,tocIndex:3},{value:"\u53C2\u6570",paraId:2,tocIndex:4},{value:"\u8BF4\u660E",paraId:2,tocIndex:4},{value:"\u7C7B\u578B",paraId:2,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:4},{value:"fn",paraId:2,tocIndex:4},{value:"\u7EC4\u4EF6 ",paraId:2,tocIndex:4},{value:"mount",paraId:2,tocIndex:4},{value:" \u65F6\u6267\u884C\u7684\u51FD\u6570\u3002",paraId:2,tocIndex:4},{value:"function",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4}]},63743:function(s,e){e.Z=`import React, { useState } from 'react';
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
