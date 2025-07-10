"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[3342],{69094:function(r,e,n){var t;n.r(e),n.d(e,{demos:function(){return h}});var u=n(90228),a=n.n(u),m=n(87999),l=n.n(m),s=n(75271),_=n(67670),c=n(61387),h={"src-use-update-demo-demo1":{component:s.memo(s.lazy(function(){return Promise.all([n.e(8457),n.e(1458),n.e(4530),n.e(6888),n.e(2433)]).then(n.bind(n,50554))})),asset:{type:"BLOCK",id:"src-use-update-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(19577).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.26.4"},"rc-hooks":{type:"NPM",value:"3.0.23"}},entry:"index.tsx"},context:{react:t||(t=n.t(s,2)),antd:_,"rc-hooks":c},renderOpts:{compile:function(){var p=l()(a()().mark(function i(){var d,f=arguments;return a()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([n.e(1620),n.e(9159)]).then(n.bind(n,29159));case 2:return o.abrupt("return",(d=o.sent).default.apply(d,f));case 3:case"end":return o.stop()}},i)}));function E(){return p.apply(this,arguments)}return E}()}}}},5777:function(r,e,n){n.r(e),n.d(e,{texts:function(){return t}});const t=[{value:"\u5F3A\u5236\u7EC4\u4EF6\u91CD\u65B0\u6E32\u67D3\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:"\u5185\u90E8\u4F7F\u7528\u4E86 useSafeState \uFF0C\u8C03\u7528\u65F6\u5982\u679C\u7EC4\u4EF6\u5DF2\u7ECF\u5378\u8F7D\u5219\u4E0D\u4F1A\u89E6\u53D1\u3002",paraId:1,tocIndex:0},{value:`const update = useUpdate();
`,paraId:2,tocIndex:3}]},19577:function(r,e){e.Z=`import React from 'react';
import { Button } from 'antd';
import { useUpdate } from 'rc-hooks';

function Demo() {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Button onClick={update} style={{ marginTop: 16 }}>
        update
      </Button>
    </>
  );
}

export default Demo;
`}}]);
