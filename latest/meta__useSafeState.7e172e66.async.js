"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[2468],{44648:function(r,n,e){var o;e.r(n),e.d(n,{demos:function(){return _}});var l=e(90228),a=e.n(l),m=e(87999),d=e.n(m),s=e(75271),c=e(63117),_={"src-use-safe-state-demo-demo1":{component:s.memo(s.lazy(function(){return Promise.all([e.e(8883),e.e(6920),e.e(3811),e.e(2518),e.e(2433)]).then(e.bind(e,90520))})),asset:{type:"BLOCK",id:"src-use-safe-state-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(37403).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.2.1"}},entry:"index.tsx"},context:{react:o||(o=e.t(s,2)),"rc-hooks":c},renderOpts:{compile:function(){var i=d()(a()().mark(function f(){var u,v=arguments;return a()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([e.e(1620),e.e(6539)]).then(e.bind(e,96539));case 2:return t.abrupt("return",(u=t.sent).default.apply(u,v));case 3:case"end":return t.stop()}},f)}));function h(){return i.apply(this,arguments)}return h}()}}}},65969:function(r,n,e){e.r(n),e.d(n,{texts:function(){return o}});const o=[{value:"\u7528\u6CD5\u4E0E React.useState \u5B8C\u5168\u4E00\u6837\uFF0C\u4F46\u662F\u5728\u7EC4\u4EF6\u5378\u8F7D\u540E setState \u4E0D\u518D\u6267\u884C\uFF0C\u907F\u514D\u56E0\u7EC4\u4EF6\u5378\u8F7D\u540E\u66F4\u65B0\u72B6\u6001\u800C\u5BFC\u81F4\u7684\u5185\u5B58\u6CC4\u6F0F\u3002",paraId:0,tocIndex:0},{value:`const [state, setState] = useSafeState(initialState?);
`,paraId:1,tocIndex:3},{value:"\u548C React.useState \u4E00\u6837\u3002",paraId:2,tocIndex:3}]},37403:function(r,n){n.Z=`import * as React from 'react';
import { useSafeState } from 'rc-hooks';

const Counter = () => {
  const [count, setCount] = useSafeState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCount((n) => n + 1);
    }, 10);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>\u8BA1\u6570\uFF1A{count}</div>;
};

function Demo() {
  const [visible, setVisible] = useSafeState(true);

  return (
    <>
      <button onClick={() => setVisible((x) => !x)}>\u70B9\u51FB\u5207\u6362\u663E\u793A/\u9690\u85CF</button>
      {visible && <Counter />}
    </>
  );
}

export default Demo;
`}}]);
