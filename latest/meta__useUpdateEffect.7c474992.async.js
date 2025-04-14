"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[1278],{53113:function(u,n,e){var o;e.r(n),e.d(n,{demos:function(){return p}});var r=e(90228),d=e.n(r),c=e(87999),l=e.n(c),a=e(75271),f=e(93551),m=e(67991),p={"src-use-update-effect-demo-demo1":{component:a.memo(a.lazy(function(){return Promise.all([e.e(5173),e.e(7222),e.e(2408),e.e(7424),e.e(2433)]).then(e.bind(e,12033))})),asset:{type:"BLOCK",id:"src-use-update-effect-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(79076).Z},antd:{type:"NPM",value:"5.24.6"},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.22"}},entry:"index.tsx"},context:{antd:f,react:o||(o=e.t(a,2)),"rc-hooks":m},renderOpts:{compile:function(){var _=l()(d()().mark(function I(){var s,v=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([e.e(1620),e.e(785)]).then(e.bind(e,80785));case 2:return t.abrupt("return",(s=t.sent).default.apply(s,v));case 3:case"end":return t.stop()}},I)}));function E(){return _.apply(this,arguments)}return E}()}}}},39747:function(u,n,e){e.r(n),e.d(n,{texts:function(){return o}});const o=[{value:"\u53EA\u5728\u4F9D\u8D56\u66F4\u65B0\u65F6\u6267\u884C\u7684 useEffect Hook\u3002",paraId:0,tocIndex:0},{value:`useUpdateEffect(effect: () => any, deps?: any[]);
`,paraId:1,tocIndex:3},{value:"\u53C2\u6570",paraId:2,tocIndex:4},{value:"\u8BF4\u660E",paraId:2,tocIndex:4},{value:"\u7C7B\u578B",paraId:2,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:4},{value:"effect",paraId:2,tocIndex:4},{value:"\u53EF\u6267\u884C\u51FD\u6570\u3002",paraId:2,tocIndex:4},{value:"function",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4},{value:"deps",paraId:2,tocIndex:4},{value:"\u53EF\u9009\u9879\uFF0C\u4F20\u5165\u4F9D\u8D56\u53D8\u5316\u7684\u5BF9\u8C61\u3002",paraId:2,tocIndex:4},{value:"any[]",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4}]},79076:function(u,n){n.Z=`import { Button } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { useUpdateEffect } from 'rc-hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [updateEffectCount, setUpdateEffectCount] = useState(0);

  useLayoutEffect(() => {
    setEffectCount((c) => c + 1);
  }, [count]);

  useUpdateEffect(() => {
    setUpdateEffectCount((c) => c + 1);
    return () => {
      // do something
    };
  }, [count]); // you can include deps array if necessary

  return (
    <div>
      <p>effectCount: {effectCount}</p>
      <p>updateEffectCount: {updateEffectCount}</p>
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
