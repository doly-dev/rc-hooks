"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[8181],{92859:function(a,n,e){var o;e.r(n),e.d(n,{demos:function(){return f}});var d=e(90228),r=e.n(d),l=e(87999),c=e.n(l),s=e(75271),m=e(39508),f={"src-use-mounted-ref-demo-basic":{component:s.memo(s.lazy(function(){return Promise.all([e.e(5173),e.e(1918),e.e(9046),e.e(8996),e.e(2433)]).then(e.bind(e,52529))})),asset:{type:"BLOCK",id:"src-use-mounted-ref-demo-basic",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(77225).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.18"}},entry:"index.tsx"},context:{react:o||(o=e.t(s,2)),"rc-hooks":m},renderOpts:{compile:function(){var _=c()(r()().mark(function I(){var u,h=arguments;return r()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([e.e(1620),e.e(1948)]).then(e.bind(e,81948));case 2:return t.abrupt("return",(u=t.sent).default.apply(u,h));case 3:case"end":return t.stop()}},I)}));function i(){return _.apply(this,arguments)}return i}()}}}},13891:function(a,n,e){e.r(n),e.d(n,{texts:function(){return o}});const o=[{value:"\u7528\u4E8E\u5F02\u6B65\u56DE\u8C03 \u6216 dom \u64CD\u4F5C\u5224\u65AD\u5F53\u524D\u7EC4\u4EF6\u662F\u5426\u88C5\u8F7D\u3002",paraId:0,tocIndex:0},{value:"\u5982\u679C\u7EC4\u4EF6\u88C5\u8F7D\u518D\u53BB\u66F4\u65B0\u72B6\u6001\u6216\u64CD\u4F5C\uFF0C\u907F\u514D\u56E0\u7EC4\u4EF6\u5378\u8F7D\u540E\u66F4\u65B0\u72B6\u6001\u800C\u5BFC\u81F4\u7684\u5185\u5B58\u6CC4\u6F0F\u3002",paraId:1,tocIndex:0},{value:"\u6CE8\u610F\uFF1A\u7EC4\u4EF6\u672A\u52A0\u8F7D\u5B8C\u6210\u65F6\uFF0CmountedRef \u7684\u503C\u4E5F\u4E3A false \u3002",paraId:2,tocIndex:0},{value:"\u5927\u591A\u6570\u573A\u666F\u4E2D\uFF0C\u4F60\u9700\u8981\u7684\u53EF\u80FD\u662F ",paraId:3,tocIndex:0},{value:"useUnmountedRef",paraId:4,tocIndex:0},{value:" \u3002",paraId:3,tocIndex:0},{value:`const mountedRef = useMountedRef();

useEffect(()=>{
  fetch().then(()=>{
    if(mountedRef.current){
      setState(...)
    }
  })
});
`,paraId:5,tocIndex:3},{value:"\u53C2\u6570",paraId:6,tocIndex:4},{value:"\u8BF4\u660E",paraId:6,tocIndex:4},{value:"\u7C7B\u578B",paraId:6,tocIndex:4},{value:"mountedRef",paraId:6,tocIndex:4},{value:"ref \u503C\u4E3A\u5F53\u524D\u7EC4\u4EF6\u662F\u5426\u88C5\u8F7D\u3002",paraId:6,tocIndex:4},{value:"React.MutableRefObject<boolean>",paraId:6,tocIndex:4}]},77225:function(a,n){n.Z=`import * as React from 'react';
import { useMountedRef } from 'rc-hooks';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  const mountedRef = useMountedRef();

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (mountedRef.current) {
        setCount((n) => n + 1);
        return;
      }
      clearInterval(timer);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>\u8BA1\u6570\uFF1A{count}</div>;
};

function Demo() {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <button onClick={() => setVisible((x) => !x)}>\u70B9\u51FB\u5207\u6362\u663E\u793A/\u9690\u85CF</button>
      {visible && <Counter />}
    </>
  );
}

export default Demo;
`}}]);
