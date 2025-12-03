"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[6741],{79735:function(r,e,n){var t;n.r(e),n.d(e,{demos:function(){return p}});var d=n(90228),a=n.n(d),c=n(87999),l=n.n(c),s=n(75271),m=n(14962),i=n(78389),p={"src-use-persist-fn-demo-demo2":{component:s.memo(s.lazy(function(){return Promise.all([n.e(8883),n.e(2869),n.e(8941),n.e(5845),n.e(2433)]).then(n.bind(n,63514))})),asset:{type:"BLOCK",id:"src-use-persist-fn-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(48802).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.29.1"},"rc-hooks":{type:"NPM",value:"3.1.1"}},entry:"index.tsx"},context:{react:t||(t=n.t(s,2)),antd:m,"rc-hooks":i},renderOpts:{compile:function(){var v=l()(a()().mark(function h(){var u,f=arguments;return a()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([n.e(1620),n.e(3245)]).then(n.bind(n,93245));case 2:return o.abrupt("return",(u=o.sent).default.apply(u,f));case 3:case"end":return o.stop()}},h)}));function I(){return v.apply(this,arguments)}return I}()}}}},71009:function(r,e,n){n.r(e),n.d(e,{texts:function(){return t}});const t=[{value:"\u6301\u4E45\u5316 function \u7684 Hook\u3002",paraId:0,tocIndex:0},{value:"\u53C2\u8003 ",paraId:1,tocIndex:0},{value:"\u5982\u4F55\u4ECE useCallback \u8BFB\u53D6\u4E00\u4E2A\u7ECF\u5E38\u53D8\u5316\u7684\u503C\uFF1F",paraId:1,tocIndex:0},{value:"\u5728\u67D0\u4E9B\u573A\u666F\u4E2D\uFF0C\u4F60\u53EF\u80FD\u4F1A\u9700\u8981\u7528 useCallback \u8BB0\u4F4F\u4E00\u4E2A\u56DE\u8C03\uFF0C\u4F46\u7531\u4E8E\u5185\u90E8\u51FD\u6570\u5FC5\u987B\u7ECF\u5E38\u91CD\u65B0\u521B\u5EFA\uFF0C\u8BB0\u5FC6\u6548\u679C\u4E0D\u662F\u5F88\u597D\uFF0C\u5BFC\u81F4\u5B50\u7EC4\u4EF6\u91CD\u590D render\u3002\u5BF9\u4E8E\u8D85\u7EA7\u590D\u6742\u7684\u5B50\u7EC4\u4EF6\uFF0C\u91CD\u65B0\u6E32\u67D3\u4F1A\u5BF9\u6027\u80FD\u9020\u6210\u5F71\u54CD\u3002\u901A\u8FC7 usePersistFn\uFF0C\u53EF\u4EE5\u4FDD\u8BC1\u51FD\u6570\u5730\u5740\u6C38\u8FDC\u4E0D\u4F1A\u53D8\u5316\u3002",paraId:2,tocIndex:0},{value:`const fn = usePersistFn(fn: (...args: any) => any);
`,paraId:3,tocIndex:3},{value:"\u53C2\u6570",paraId:4,tocIndex:4},{value:"\u8BF4\u660E",paraId:4,tocIndex:4},{value:"\u7C7B\u578B",paraId:4,tocIndex:4},{value:"fn",paraId:4,tocIndex:4},{value:"\u5F15\u7528\u5730\u5740\u6C38\u8FDC\u4E0D\u4F1A\u53D8\u5316\u7684 ",paraId:4,tocIndex:4},{value:"fn",paraId:4,tocIndex:4},{value:"\u3002",paraId:4,tocIndex:4},{value:"function",paraId:4,tocIndex:4},{value:"\u53C2\u6570",paraId:5,tocIndex:5},{value:"\u8BF4\u660E",paraId:5,tocIndex:5},{value:"\u7C7B\u578B",paraId:5,tocIndex:5},{value:"\u9ED8\u8BA4\u503C",paraId:5,tocIndex:5},{value:"fn",paraId:5,tocIndex:5},{value:"\u9700\u8981\u6301\u4E45\u5316\u7684\u51FD\u6570\u3002",paraId:5,tocIndex:5},{value:"function",paraId:5,tocIndex:5},{value:"-",paraId:5,tocIndex:5}]},48802:function(r,e){e.Z=`import React, { useState, useCallback, useRef } from 'react';
import { Button, message } from 'antd';
import { usePersistFn } from 'rc-hooks';

interface ExpensiveTreeProp {
  showCount: () => void;
}

// some expensive component with React.memo
const ExpensiveTree = React.memo(({ showCount }: ExpensiveTreeProp) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div>
      <p>Render Count: {renderCountRef.current}</p>
      <Button onClick={showCount}>showParentCount</Button>
    </div>
  );
});

ExpensiveTree.displayName = 'ExpensiveTree';

function Demo() {
  const [count, setCount] = useState(1);

  const showCountPersistFn = usePersistFn(() => {
    message.info(\`Current count is \${count}\`);
  });

  const showCountCommon = useCallback(() => {
    message.info(\`Current count is \${count}\`);
  }, [count]);

  return (
    <>
      <Button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Add Count
      </Button>
      <p>You can click the button to see the number of sub-component renderings</p>

      <div style={{ marginTop: 32 }}>
        <h4>Component with persist function:</h4>
        {/* use persist function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={showCountPersistFn} />
      </div>
      <div style={{ marginTop: 32 }}>
        <h4>Component without persist function:</h4>
        {/* use persist function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={showCountCommon} />
      </div>
    </>
  );
}

export default Demo;
`}}]);
