"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[2037],{58012:function(r,a,e){var t;e.r(a),e.d(a,{demos:function(){return h}});var i=e(90228),d=e.n(i),f=e(87999),I=e.n(f),o=e(75271),p=e(3201),v=e(4033),h={"src-use-debounce-fn-demo-demo1":{component:o.memo(o.lazy(function(){return Promise.all([e.e(4920),e.e(6920),e.e(3811),e.e(674),e.e(2433)]).then(e.bind(e,13288))})),asset:{type:"BLOCK",id:"src-use-debounce-fn-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(38181).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.29.3"},"rc-hooks":{type:"NPM",value:"3.3.0"}},entry:"index.tsx"},context:{react:t||(t=e.t(o,2)),antd:p,"rc-hooks":v},renderOpts:{compile:function(){var l=I()(d()().mark(function c(){var u,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(7855).then(e.bind(e,57855));case 2:return n.abrupt("return",(u=n.sent).default.apply(u,m));case 3:case"end":return n.stop()}},c)}));function s(){return l.apply(this,arguments)}return s}()}},"src-use-debounce-fn-demo-demo2":{component:o.memo(o.lazy(function(){return Promise.all([e.e(4920),e.e(6920),e.e(3811),e.e(674),e.e(2433)]).then(e.bind(e,80989))})),asset:{type:"BLOCK",id:"src-use-debounce-fn-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(22267).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.29.3"},"rc-hooks":{type:"NPM",value:"3.3.0"}},entry:"index.tsx"},context:{react:t||(t=e.t(o,2)),antd:p,"rc-hooks":v},renderOpts:{compile:function(){var l=I()(d()().mark(function c(){var u,m=arguments;return d()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(7855).then(e.bind(e,57855));case 2:return n.abrupt("return",(u=n.sent).default.apply(u,m));case 3:case"end":return n.stop()}},c)}));function s(){return l.apply(this,arguments)}return s}()}}}},19437:function(r,a,e){e.r(a),e.d(a,{texts:function(){return t}});const t=[{value:"\u7528\u6765\u5904\u7406\u9632\u6296\u51FD\u6570\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`const { run, cancel, flush } = useDebounceFn(
  fn: (...args: any[]) => any,
  wait?: number,
  immediate?: boolean
);
`,paraId:1,tocIndex:4},{value:"\u53C2\u6570",paraId:2,tocIndex:5},{value:"\u8BF4\u660E",paraId:2,tocIndex:5},{value:"\u7C7B\u578B",paraId:2,tocIndex:5},{value:"run",paraId:2,tocIndex:5},{value:"\u89E6\u53D1\u6267\u884C ",paraId:2,tocIndex:5},{value:"fn",paraId:2,tocIndex:5},{value:"\uFF0C\u53C2\u6570\u4E5F\u4F1A\u4F20\u9012\u7ED9 ",paraId:2,tocIndex:5},{value:"fn",paraId:2,tocIndex:5},{value:"\u3002",paraId:2,tocIndex:5},{value:"(...args: any[]) => any",paraId:2,tocIndex:5},{value:"cancel",paraId:2,tocIndex:5},{value:"\u53D6\u6D88\u5F53\u524D\u9632\u6296\u3002",paraId:2,tocIndex:5},{value:"() => void",paraId:2,tocIndex:5},{value:"flush",paraId:2,tocIndex:5},{value:"\u7ACB\u5373\u8C03\u7528\u9632\u6296\u51FD\u6570\u3002",paraId:2,tocIndex:5},{value:"() => void",paraId:2,tocIndex:5},{value:"\u53C2\u6570",paraId:3,tocIndex:6},{value:"\u8BF4\u660E",paraId:3,tocIndex:6},{value:"\u7C7B\u578B",paraId:3,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:6},{value:"fn",paraId:3,tocIndex:6},{value:"\u9700\u8981\u9632\u6296\u7684\u51FD\u6570\u3002",paraId:3,tocIndex:6},{value:"function",paraId:3,tocIndex:6},{value:"() => {}",paraId:3,tocIndex:6},{value:"wait",paraId:3,tocIndex:6},{value:"\u9632\u6296\u7B49\u5F85\u65F6\u95F4\uFF0C\u5355\u4F4D\u4E3A\u6BEB\u79D2\u3002",paraId:3,tocIndex:6},{value:"number",paraId:3,tocIndex:6},{value:"0",paraId:3,tocIndex:6},{value:"immediate",paraId:3,tocIndex:6},{value:"\u662F\u5426\u5728\u5EF6\u8FDF\u5F00\u59CB\u524D\u8C03\u7528\u3002",paraId:3,tocIndex:6},{value:"boolean",paraId:3,tocIndex:6},{value:"false",paraId:3,tocIndex:6}]},38181:function(r,a){a.Z=`import React, { useState } from 'react';
import { Button } from 'antd';
import { useDebounceFn } from 'rc-hooks';

function Demo() {
  const [value, setValue] = useState(0);
  const { run } = useDebounceFn(setValue, 500);

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <Button onClick={() => run(value + 1)}>Click fast!</Button>
    </div>
  );
}

export default Demo;
`},22267:function(r,a){a.Z=`import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useDebounceFn } from 'rc-hooks';

function Demo() {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>();

  const { run, cancel } = useDebounceFn(setDebouncedValue, 1000);

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          run(e.target.value);
        }}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ margin: '16px 0' }}>
        <Button onClick={cancel}>Cancel Debounce</Button>
      </p>
      <p>value: {value}</p>
      <p>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}

export default Demo;
`}}]);
