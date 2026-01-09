"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[3342],{63928:function(r,e,n){var t;n.r(e),n.d(e,{demos:function(){return h}});var u=n(90228),a=n.n(u),m=n(87999),l=n.n(m),s=n(75271),_=n(51370),c=n(66472),h={"src-use-update-demo-demo1":{component:s.memo(s.lazy(function(){return Promise.all([n.e(8883),n.e(6920),n.e(3811),n.e(2518),n.e(2433)]).then(n.bind(n,13832))})),asset:{type:"BLOCK",id:"src-use-update-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(84953).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.29.3"},"rc-hooks":{type:"NPM",value:"3.2.2"}},entry:"index.tsx"},context:{react:t||(t=n.t(s,2)),antd:_,"rc-hooks":c},renderOpts:{compile:function(){var p=l()(a()().mark(function E(){var d,f=arguments;return a()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([n.e(1620),n.e(553)]).then(n.bind(n,70553));case 2:return o.abrupt("return",(d=o.sent).default.apply(d,f));case 3:case"end":return o.stop()}},E)}));function i(){return p.apply(this,arguments)}return i}()}}}},92417:function(r,e,n){n.r(e),n.d(e,{texts:function(){return t}});const t=[{value:"\u5F3A\u5236\u7EC4\u4EF6\u91CD\u65B0\u6E32\u67D3\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:"\u5185\u90E8\u4F7F\u7528\u4E86 useSafeState \uFF0C\u8C03\u7528\u65F6\u5982\u679C\u7EC4\u4EF6\u5DF2\u7ECF\u5378\u8F7D\u5219\u4E0D\u4F1A\u89E6\u53D1\u3002",paraId:1,tocIndex:0},{value:`const update = useUpdate();
`,paraId:2,tocIndex:3}]},84953:function(r,e){e.Z=`import React from 'react';
import { Button } from 'antd';
import { useUpdate } from 'rc-hooks';

function Demo() {
  const update = useUpdate();

  return (
    <>
      {/* eslint-disable-next-line react-hooks/purity */}
      <div>Time: {Date.now()}</div>
      <Button onClick={update} style={{ marginTop: 16 }}>
        update
      </Button>
    </>
  );
}

export default Demo;
`}}]);
