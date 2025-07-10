"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[1845],{12666:function(s,e,n){var o;n.r(e),n.d(e,{demos:function(){return i}});var d=n(90228),r=n.n(d),c=n(87999),l=n.n(c),u=n(75271),m=n(61387),i={"src-use-unmounted-ref-demo-basic":{component:u.memo(u.lazy(function(){return Promise.all([n.e(8457),n.e(1458),n.e(4530),n.e(6888),n.e(2433)]).then(n.bind(n,22298))})),asset:{type:"BLOCK",id:"src-use-unmounted-ref-demo-basic",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(3932).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.23"}},entry:"index.tsx"},context:{react:o||(o=n.t(u,2)),"rc-hooks":m},renderOpts:{compile:function(){var _=l()(r()().mark(function h(){var a,v=arguments;return r()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([n.e(1620),n.e(9159)]).then(n.bind(n,29159));case 2:return t.abrupt("return",(a=t.sent).default.apply(a,v));case 3:case"end":return t.stop()}},h)}));function f(){return _.apply(this,arguments)}return f}()}}}},82567:function(s,e,n){n.r(e),n.d(e,{texts:function(){return o}});const o=[{value:"\u7528\u4E8E\u5F02\u6B65\u56DE\u8C03\u4E2D\u5224\u65AD\u5F53\u524D\u7EC4\u4EF6\u662F\u5426\u5378\u8F7D\u3002",paraId:0,tocIndex:0},{value:"\u5982\u679C\u7EC4\u4EF6\u5378\u8F7D\u5C31\u4E0D\u66F4\u65B0\u72B6\u6001\uFF0C\u907F\u514D\u56E0\u7EC4\u4EF6\u5378\u8F7D\u540E\u66F4\u65B0\u72B6\u6001\u800C\u5BFC\u81F4\u7684\u5185\u5B58\u6CC4\u6F0F\u3002",paraId:1,tocIndex:0},{value:`const unmountedRef = useUnmountedRef();

useEffect(()=>{
  fetch().then(()=>{
    if(unmountedRef.current){
      return;
    }
    setState(...)
  })
});
`,paraId:2,tocIndex:3},{value:"\u53C2\u6570",paraId:3,tocIndex:4},{value:"\u8BF4\u660E",paraId:3,tocIndex:4},{value:"\u7C7B\u578B",paraId:3,tocIndex:4},{value:"unmountedRef",paraId:3,tocIndex:4},{value:"ref \u503C\u4E3A\u5F53\u524D\u7EC4\u4EF6\u662F\u5426\u5378\u8F7D",paraId:3,tocIndex:4},{value:"React.MutableRefObject<boolean>",paraId:3,tocIndex:4}]},3932:function(s,e){e.Z=`import * as React from 'react';
import { useUnmountedRef } from 'rc-hooks';

const Counter: React.FC<{
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ count, setCount }) => {
  const unmountedRef = useUnmountedRef();

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (unmountedRef.current) {
        clearInterval(timer);
        return;
      }
      setCount((n) => n + 1);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>\u8BA1\u6570\uFF1A{count}</div>;
};

function Demo() {
  const [count, setCount] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <button onClick={() => setVisible((x) => !x)}>\u70B9\u51FB\u5207\u6362\u663E\u793A/\u9690\u85CF</button>
      {visible && <Counter count={count} setCount={setCount} />}
    </>
  );
}

export default Demo;
`}}]);
