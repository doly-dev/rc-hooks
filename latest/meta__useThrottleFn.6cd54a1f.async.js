"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[9090],{17869:function(d,t,n){var a;n.r(t),n.d(t,{demos:function(){return f}});var h=n(90228),r=n.n(h),i=n(87999),I=n.n(i),o=n(75271),p=n(45103),v=n(24002),f={"src-use-throttle-fn-demo-demo1":{component:o.memo(o.lazy(function(){return Promise.all([n.e(8670),n.e(5005),n.e(8293),n.e(5845),n.e(2433)]).then(n.bind(n,2802))})),asset:{type:"BLOCK",id:"src-use-throttle-fn-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(30351).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.27.0"},"rc-hooks":{type:"NPM",value:"3.0.25"}},entry:"index.tsx"},context:{react:a||(a=n.t(o,2)),antd:p,"rc-hooks":v},renderOpts:{compile:function(){var u=I()(r()().mark(function c(){var l,m=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(1620),n.e(9294)]).then(n.bind(n,29294));case 2:return e.abrupt("return",(l=e.sent).default.apply(l,m));case 3:case"end":return e.stop()}},c)}));function s(){return u.apply(this,arguments)}return s}()}},"src-use-throttle-fn-demo-demo2":{component:o.memo(o.lazy(function(){return Promise.all([n.e(8670),n.e(5005),n.e(8293),n.e(5845),n.e(2433)]).then(n.bind(n,72529))})),asset:{type:"BLOCK",id:"src-use-throttle-fn-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(89898).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.27.0"},"rc-hooks":{type:"NPM",value:"3.0.25"}},entry:"index.tsx"},context:{react:a||(a=n.t(o,2)),antd:p,"rc-hooks":v},renderOpts:{compile:function(){var u=I()(r()().mark(function c(){var l,m=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(1620),n.e(9294)]).then(n.bind(n,29294));case 2:return e.abrupt("return",(l=e.sent).default.apply(l,m));case 3:case"end":return e.stop()}},c)}));function s(){return u.apply(this,arguments)}return s}()}}}},59274:function(d,t,n){n.r(t),n.d(t,{texts:function(){return a}});const a=[{value:"\u7528\u6765\u5904\u7406\u8282\u6D41\u51FD\u6570\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`const { run, cancel, flush } = useThrottleFn(
  fn: (...args: any) => any,
  wait?: number,
  immediate?: boolean
);
`,paraId:1,tocIndex:4},{value:"\u53C2\u6570",paraId:2,tocIndex:5},{value:"\u8BF4\u660E",paraId:2,tocIndex:5},{value:"\u7C7B\u578B",paraId:2,tocIndex:5},{value:"run",paraId:2,tocIndex:5},{value:"\u89E6\u53D1\u6267\u884C ",paraId:2,tocIndex:5},{value:"fn",paraId:2,tocIndex:5},{value:"\uFF0C\u53C2\u6570\u4E5F\u4F1A\u4F20\u9012\u7ED9 ",paraId:2,tocIndex:5},{value:"fn",paraId:2,tocIndex:5},{value:"\u3002",paraId:2,tocIndex:5},{value:"(...args: any[]) => any",paraId:2,tocIndex:5},{value:"cancel",paraId:2,tocIndex:5},{value:"\u53D6\u6D88\u5F53\u524D\u8282\u6D41\u3002",paraId:2,tocIndex:5},{value:"() => void",paraId:2,tocIndex:5},{value:"flush",paraId:2,tocIndex:5},{value:"\u7ACB\u5373\u8C03\u7528\u8282\u6D41\u51FD\u6570\u3002",paraId:2,tocIndex:5},{value:"() => void",paraId:2,tocIndex:5},{value:"\u53C2\u6570",paraId:3,tocIndex:6},{value:"\u8BF4\u660E",paraId:3,tocIndex:6},{value:"\u7C7B\u578B",paraId:3,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:6},{value:"fn",paraId:3,tocIndex:6},{value:"\u9700\u8981\u8282\u6D41\u7684\u51FD\u6570\u3002",paraId:3,tocIndex:6},{value:"function",paraId:3,tocIndex:6},{value:"() => {}",paraId:3,tocIndex:6},{value:"wait",paraId:3,tocIndex:6},{value:"\u8282\u6D41\u7B49\u5F85\u65F6\u95F4\uFF0C\u5355\u4F4D\u4E3A\u6BEB\u79D2\u3002",paraId:3,tocIndex:6},{value:"number",paraId:3,tocIndex:6},{value:"0",paraId:3,tocIndex:6},{value:"immediate",paraId:3,tocIndex:6},{value:"\u662F\u5426\u5728\u5EF6\u8FDF\u5F00\u59CB\u524D\u8C03\u7528\u3002",paraId:3,tocIndex:6},{value:"boolean",paraId:3,tocIndex:6},{value:"true",paraId:3,tocIndex:6}]},30351:function(d,t){t.Z=`import React, { useState } from 'react';
import { Button } from 'antd';
import { useThrottleFn } from 'rc-hooks';

function Demo() {
  const [value, setValue] = useState(0);
  const { run } = useThrottleFn(setValue, 500);

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <Button
        onClick={() => {
          run(value + 1);
        }}
      >
        Click fast!
      </Button>
    </div>
  );
}

export default Demo;
`},89898:function(d,t){t.Z=`import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useThrottleFn } from 'rc-hooks';

function Demo() {
  const [value, setValue] = useState('');
  const [throttleValue, setThrottleValue] = useState<string | undefined>();

  const { run, cancel } = useThrottleFn(setThrottleValue, 1000);

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
        <Button onClick={cancel}>Cancel Throttle</Button>
      </p>
      <p>value: {value}</p>
      <p>throttleValue: {throttleValue}</p>
    </div>
  );
}

export default Demo;
`}}]);
