"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[5084],{90003:function(u,t,e){var o;e.r(t),e.d(t,{demos:function(){return p}});var r=e(90228),s=e.n(r),c=e(87999),l=e.n(c),a=e(75271),f=e(14962),m=e(52620),p={"src-use-update-layout-effect-demo-demo1":{component:a.memo(a.lazy(function(){return Promise.all([e.e(8883),e.e(2869),e.e(8941),e.e(5845),e.e(2433)]).then(e.bind(e,34865))})),asset:{type:"BLOCK",id:"src-use-update-layout-effect-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(55250).Z},antd:{type:"NPM",value:"5.29.1"},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.2.0"}},entry:"index.tsx"},context:{antd:f,react:o||(o=e.t(a,2)),"rc-hooks":m},renderOpts:{compile:function(){var _=l()(s()().mark(function I(){var d,y=arguments;return s()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all([e.e(1620),e.e(9250)]).then(e.bind(e,29250));case 2:return n.abrupt("return",(d=n.sent).default.apply(d,y));case 3:case"end":return n.stop()}},I)}));function E(){return _.apply(this,arguments)}return E}()}}}},66018:function(u,t,e){e.r(t),e.d(t,{texts:function(){return o}});const o=[{value:"\u53EA\u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u7684 useLayoutEffect Hook\u3002",paraId:0,tocIndex:0},{value:`useUpdateLayoutEffect(effect: () => void, deps?: any[]);
`,paraId:1,tocIndex:3},{value:"\u53C2\u6570",paraId:2,tocIndex:4},{value:"\u8BF4\u660E",paraId:2,tocIndex:4},{value:"\u7C7B\u578B",paraId:2,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:4},{value:"effect",paraId:2,tocIndex:4},{value:"\u53EF\u6267\u884C\u51FD\u6570\u3002",paraId:2,tocIndex:4},{value:"function",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4},{value:"deps",paraId:2,tocIndex:4},{value:"\u53EF\u9009\u9879\uFF0C\u4F20\u5165\u4F9D\u8D56\u53D8\u5316\u7684\u5BF9\u8C61\u3002",paraId:2,tocIndex:4},{value:"any[]",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4}]},55250:function(u,t){t.Z=`import { Button } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { useUpdateLayoutEffect } from 'rc-hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const [layoutEffectCount, setLayoutEffectCount] = useState(0);
  const [updateLayoutEffectCount, setUpdateLayoutEffectCount] = useState(0);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLayoutEffectCount((c) => c + 1);
  }, [count]);

  useUpdateLayoutEffect(() => {
    setUpdateLayoutEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>layoutEffectCount: {layoutEffectCount}</p>
      <p>updateLayoutEffectCount: {updateLayoutEffectCount}</p>
      <p>
        <Button type="primary" onClick={() => setCount((c) => c + 1)}>
          reRender
        </Button>
      </p>
    </div>
  );
}

export default Demo;
`}}]);
