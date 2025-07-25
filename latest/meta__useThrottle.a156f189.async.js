"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[7624],{76609:function(r,n,e){var o;e.r(n),e.d(n,{demos:function(){return v}});var u=e(90228),d=e.n(u),s=e(87999),m=e.n(s),a=e(75271),c=e(70098),I=e(92119),v={"src-use-throttle-demo-demo1":{component:a.memo(a.lazy(function(){return Promise.all([e.e(4677),e.e(7456),e.e(6714),e.e(976),e.e(2433)]).then(e.bind(e,89494))})),asset:{type:"BLOCK",id:"src-use-throttle-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(51943).Z},antd:{type:"NPM",value:"5.26.6"},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.23"}},entry:"index.tsx"},context:{antd:c,react:o||(o=e.t(a,2)),"rc-hooks":I},renderOpts:{compile:function(){var h=m()(d()().mark(function p(){var l,i=arguments;return d()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([e.e(1620),e.e(7390)]).then(e.bind(e,67390));case 2:return t.abrupt("return",(l=t.sent).default.apply(l,i));case 3:case"end":return t.stop()}},p)}));function _(){return h.apply(this,arguments)}return _}()}}}},82899:function(r,n,e){e.r(n),e.d(n,{texts:function(){return o}});const o=[{value:"\u7528\u6765\u5904\u7406\u8282\u6D41\u503C\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`const throttledValue = useThrottle(
  value: any,
  wait?: number,
  immediate?: boolean
);
`,paraId:1,tocIndex:3},{value:"\u53C2\u6570",paraId:2,tocIndex:4},{value:"\u8BF4\u660E",paraId:2,tocIndex:4},{value:"\u7C7B\u578B",paraId:2,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:4},{value:"value",paraId:2,tocIndex:4},{value:"\u9700\u8981\u8282\u6D41\u7684\u503C\u3002",paraId:2,tocIndex:4},{value:"any",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4},{value:"wait",paraId:2,tocIndex:4},{value:"\u8282\u6D41\u7B49\u5F85\u65F6\u95F4\uFF0C\u5355\u4F4D\u4E3A\u6BEB\u79D2\u3002",paraId:2,tocIndex:4},{value:"number",paraId:2,tocIndex:4},{value:"0",paraId:2,tocIndex:4},{value:"immediate",paraId:2,tocIndex:4},{value:"\u662F\u5426\u5728\u5EF6\u8FDF\u5F00\u59CB\u524D\u8C03\u7528\u3002",paraId:2,tocIndex:4},{value:"boolean",paraId:2,tocIndex:4},{value:"true",paraId:2,tocIndex:4}]},51943:function(r,n){n.Z=`import { Input } from 'antd';
import React, { useState } from 'react';
import { useThrottle } from 'rc-hooks';

function Demo() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottle(value, 500);

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
    </div>
  );
}

export default Demo;
`}}]);
