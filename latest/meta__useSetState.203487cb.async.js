"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[9160],{32713:function(a,t,n){var o;n.r(t),n.d(t,{demos:function(){return _}});var l=n(90228),r=n.n(l),d=n(87999),m=n.n(d),s=n(75271),c=n(62957),i=n(51953),_={"src-use-set-state-demo-basic":{component:s.memo(s.lazy(function(){return Promise.all([n.e(8883),n.e(6586),n.e(3484),n.e(5845),n.e(2433)]).then(n.bind(n,66197))})),asset:{type:"BLOCK",id:"src-use-set-state-demo-basic",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(25113).Z},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"5.27.3"},"rc-hooks":{type:"NPM",value:"3.1.0"}},entry:"index.tsx"},context:{react:o||(o=n.t(s,2)),antd:c,"rc-hooks":i},renderOpts:{compile:function(){var p=m()(r()().mark(function f(){var u,v=arguments;return r()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(1620),n.e(542)]).then(n.bind(n,10542));case 2:return e.abrupt("return",(u=e.sent).default.apply(u,v));case 3:case"end":return e.stop()}},f)}));function h(){return p.apply(this,arguments)}return h}()}}}},75637:function(a,t,n){n.r(t),n.d(t,{texts:function(){return o}});const o=[{value:"\u7BA1\u7406 object \u7C7B\u578B state \u7684 Hook \uFF0C\u7528\u6CD5\u548C class \u7EC4\u4EF6\u7684 ",paraId:0,tocIndex:0},{value:"this.setState",paraId:0,tocIndex:0},{value:" \u57FA\u672C\u4E00\u81F4\uFF0C\u5185\u90E8\u4F7F\u7528\u5C55\u5F00\u64CD\u4F5C\u7B26\u8FDB\u884C\u5408\u5E76\u3002",paraId:0,tocIndex:0},{value:`const [state, setState] = useSetState(initialState?);
`,paraId:1,tocIndex:3}]},25113:function(a,t){t.Z=`import React from 'react';
import { Space, Button } from 'antd';
import { useSetState } from 'rc-hooks';

function Demo() {
  const [state, setState] = useSetState({
    foo: 0,
    count: 0,
    bar: undefined as string | undefined
  });

  return (
    <div>
      <p>* \u8BBE\u7F6E\u76F8\u540C\u7684 foo/bar \u503C\u65F6\u8FD8\u662F\u4F1A\u89E6\u53D1\u6E32\u67D3</p>
      <p style={{ color: 'gray' }}>\u65F6\u95F4\u6233\uFF08\u76D1\u6D4B\u662F\u5426\u89E6\u53D1\u6E32\u67D3\uFF09\uFF1A{Date.now()}</p>
      <Space>
        <Button type="primary" onClick={() => setState({ foo: 42 })}>
          \u8BBE\u7F6E foo
        </Button>
        <Button type="primary" onClick={() => setState({ bar: 'biz' })}>
          \u8BBE\u7F6E bar
        </Button>
        <Button type="primary" onClick={() => setState((prev) => ({ count: prev.count + 1 }))}>
          count + 1
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            // \u8BBE\u7F6E\u975E\u5BF9\u8C61\u6570\u636E\uFF0C\u5C06\u4E0D\u5904\u7406\u3002 \u5982\uFF1A null, undefined, number, string, boolean \u7B49
            // @ts-ignore
            setState(1324);
          }}
        >
          \u975E\u5BF9\u8C61\u6570\u636E\u4E0D\u5904\u7406
        </Button>
      </Space>
      <br />
      <br />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default Demo;
`}}]);
