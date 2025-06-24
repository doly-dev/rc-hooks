"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[2037],{34907:function(l,a,n){var t;n.r(a),n.d(a,{demos:function(){return h}});var i=n(90228),d=n.n(i),f=n(87999),I=n.n(f),o=n(75271),p=n(78525),v=n(39549),h={"src-use-debounce-fn-demo-demo1":{component:o.memo(o.lazy(function(){return Promise.all([n.e(8457),n.e(5168),n.e(4831),n.e(2316),n.e(2433)]).then(n.bind(n,39370))})),asset:{type:"BLOCK",id:"src-use-debounce-fn-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(75986).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.26.1"},"rc-hooks":{type:"NPM",value:"3.0.22"}},entry:"index.tsx"},context:{react:t||(t=n.t(o,2)),antd:p,"rc-hooks":v},renderOpts:{compile:function(){var r=I()(d()().mark(function c(){var u,m=arguments;return d()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(1620),n.e(3018)]).then(n.bind(n,23018));case 2:return e.abrupt("return",(u=e.sent).default.apply(u,m));case 3:case"end":return e.stop()}},c)}));function s(){return r.apply(this,arguments)}return s}()}},"src-use-debounce-fn-demo-demo2":{component:o.memo(o.lazy(function(){return Promise.all([n.e(8457),n.e(5168),n.e(4831),n.e(2316),n.e(2433)]).then(n.bind(n,35661))})),asset:{type:"BLOCK",id:"src-use-debounce-fn-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(10282).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.26.1"},"rc-hooks":{type:"NPM",value:"3.0.22"}},entry:"index.tsx"},context:{react:t||(t=n.t(o,2)),antd:p,"rc-hooks":v},renderOpts:{compile:function(){var r=I()(d()().mark(function c(){var u,m=arguments;return d()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(1620),n.e(3018)]).then(n.bind(n,23018));case 2:return e.abrupt("return",(u=e.sent).default.apply(u,m));case 3:case"end":return e.stop()}},c)}));function s(){return r.apply(this,arguments)}return s}()}}}},42366:function(l,a,n){n.r(a),n.d(a,{texts:function(){return t}});const t=[{value:"\u7528\u6765\u5904\u7406\u9632\u6296\u51FD\u6570\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`const { run, cancel, flush } = useDebounceFn(
  fn: (...args: any[]) => any,
  wait?: number,
  immediate?: boolean
);
`,paraId:1,tocIndex:4},{value:"\u53C2\u6570",paraId:2,tocIndex:5},{value:"\u8BF4\u660E",paraId:2,tocIndex:5},{value:"\u7C7B\u578B",paraId:2,tocIndex:5},{value:"run",paraId:2,tocIndex:5},{value:"\u89E6\u53D1\u6267\u884C ",paraId:2,tocIndex:5},{value:"fn",paraId:2,tocIndex:5},{value:"\uFF0C\u53C2\u6570\u4E5F\u4F1A\u4F20\u9012\u7ED9 ",paraId:2,tocIndex:5},{value:"fn",paraId:2,tocIndex:5},{value:"\u3002",paraId:2,tocIndex:5},{value:"(...args: any[]) => any",paraId:2,tocIndex:5},{value:"cancel",paraId:2,tocIndex:5},{value:"\u53D6\u6D88\u5F53\u524D\u9632\u6296\u3002",paraId:2,tocIndex:5},{value:"() => void",paraId:2,tocIndex:5},{value:"flush",paraId:2,tocIndex:5},{value:"\u7ACB\u5373\u8C03\u7528\u9632\u6296\u51FD\u6570\u3002",paraId:2,tocIndex:5},{value:"() => void",paraId:2,tocIndex:5},{value:"\u53C2\u6570",paraId:3,tocIndex:6},{value:"\u8BF4\u660E",paraId:3,tocIndex:6},{value:"\u7C7B\u578B",paraId:3,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:6},{value:"fn",paraId:3,tocIndex:6},{value:"\u9700\u8981\u9632\u6296\u7684\u51FD\u6570\u3002",paraId:3,tocIndex:6},{value:"function",paraId:3,tocIndex:6},{value:"() => {}",paraId:3,tocIndex:6},{value:"wait",paraId:3,tocIndex:6},{value:"\u9632\u6296\u7B49\u5F85\u65F6\u95F4\uFF0C\u5355\u4F4D\u4E3A\u6BEB\u79D2\u3002",paraId:3,tocIndex:6},{value:"number",paraId:3,tocIndex:6},{value:"0",paraId:3,tocIndex:6},{value:"immediate",paraId:3,tocIndex:6},{value:"\u662F\u5426\u5728\u5EF6\u8FDF\u5F00\u59CB\u524D\u8C03\u7528\u3002",paraId:3,tocIndex:6},{value:"boolean",paraId:3,tocIndex:6},{value:"false",paraId:3,tocIndex:6}]},75986:function(l,a){a.Z=`import React, { useState } from 'react';
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
`},10282:function(l,a){a.Z=`import React, { useState } from 'react';
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
