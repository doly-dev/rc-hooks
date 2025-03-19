"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[7286],{89410:function(d,n,e){var a;e.r(n),e.d(n,{demos:function(){return v}});var l=e(90228),u=e.n(l),s=e(87999),m=e.n(s),t=e(75271),c=e(79405),I=e(39508),v={"src-use-debounce-demo-demo1":{component:t.memo(t.lazy(function(){return Promise.all([e.e(2601),e.e(7498),e.e(1587),e.e(8996),e.e(2433)]).then(e.bind(e,11850))})),asset:{type:"BLOCK",id:"src-use-debounce-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(70418).Z},antd:{type:"NPM",value:"5.24.4"},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.17"}},entry:"index.tsx"},context:{antd:c,react:a||(a=e.t(t,2)),"rc-hooks":I},renderOpts:{compile:function(){var _=m()(u()().mark(function h(){var r,i=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([e.e(1620),e.e(1782)]).then(e.bind(e,91782));case 2:return o.abrupt("return",(r=o.sent).default.apply(r,i));case 3:case"end":return o.stop()}},h)}));function p(){return _.apply(this,arguments)}return p}()}}}},85497:function(d,n,e){e.r(n),e.d(n,{texts:function(){return a}});const a=[{value:"\u7528\u6765\u5904\u7406\u9632\u6296\u503C\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`const debouncedValue = useDebounce(
  value: any,
  wait?: number,
  immediate?: boolean
);
`,paraId:1,tocIndex:3},{value:"\u53C2\u6570",paraId:2,tocIndex:4},{value:"\u8BF4\u660E",paraId:2,tocIndex:4},{value:"\u7C7B\u578B",paraId:2,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:4},{value:"value",paraId:2,tocIndex:4},{value:"\u9700\u8981\u9632\u6296\u7684\u503C\u3002",paraId:2,tocIndex:4},{value:"any",paraId:2,tocIndex:4},{value:"-",paraId:2,tocIndex:4},{value:"wait",paraId:2,tocIndex:4},{value:"\u9632\u6296\u7B49\u5F85\u65F6\u95F4\uFF0C\u5355\u4F4D\u4E3A\u6BEB\u79D2\u3002",paraId:2,tocIndex:4},{value:"number",paraId:2,tocIndex:4},{value:"0",paraId:2,tocIndex:4},{value:"immediate",paraId:2,tocIndex:4},{value:"\u662F\u5426\u5728\u5EF6\u8FDF\u5F00\u59CB\u524D\u8C03\u7528\u3002",paraId:2,tocIndex:4},{value:"boolean",paraId:2,tocIndex:4},{value:"false",paraId:2,tocIndex:4}]},70418:function(d,n){n.Z=`import { Input } from 'antd';
import React, { useState } from 'react';
import { useDebounce } from 'rc-hooks';

function Demo() {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}

export default Demo;
`}}]);
