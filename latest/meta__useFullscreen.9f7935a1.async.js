"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[9386],{29094:function(i,t,n){var l;n.r(t),n.d(t,{demos:function(){return x}});var I=n(90228),d=n.n(I),f=n(87999),m=n.n(f),o=n(75271),v=n(89139),x={"src-use-fullscreen-demo-demo1":{component:o.memo(o.lazy(function(){return Promise.all([n.e(5399),n.e(6920),n.e(3811),n.e(674),n.e(2433)]).then(n.bind(n,51312))})),asset:{type:"BLOCK",id:"src-use-fullscreen-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(1100).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.4.0"}},entry:"index.tsx"},context:{react:l||(l=n.t(o,2)),"rc-hooks":v},renderOpts:{compile:function(){var r=m()(d()().mark(function u(){var a,c=arguments;return d()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(8953).then(n.bind(n,48953));case 2:return e.abrupt("return",(a=e.sent).default.apply(a,c));case 3:case"end":return e.stop()}},u)}));function s(){return r.apply(this,arguments)}return s}()}},"src-use-fullscreen-demo-demo2":{component:o.memo(o.lazy(function(){return Promise.all([n.e(5399),n.e(6920),n.e(3811),n.e(674),n.e(2433)]).then(n.bind(n,68319))})),asset:{type:"BLOCK",id:"src-use-fullscreen-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(79843).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.4.0"}},entry:"index.tsx"},context:{react:l||(l=n.t(o,2)),"rc-hooks":v},renderOpts:{compile:function(){var r=m()(d()().mark(function u(){var a,c=arguments;return d()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(8953).then(n.bind(n,48953));case 2:return e.abrupt("return",(a=e.sent).default.apply(a,c));case 3:case"end":return e.stop()}},u)}));function s(){return r.apply(this,arguments)}return s}()}},"src-use-fullscreen-demo-demo3":{component:o.memo(o.lazy(function(){return Promise.all([n.e(5399),n.e(6920),n.e(3811),n.e(674),n.e(2433)]).then(n.bind(n,87136))})),asset:{type:"BLOCK",id:"src-use-fullscreen-demo-demo3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(86221).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.4.0"}},entry:"index.tsx"},context:{react:l||(l=n.t(o,2)),"rc-hooks":v},renderOpts:{compile:function(){var r=m()(d()().mark(function u(){var a,c=arguments;return d()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.e(8953).then(n.bind(n,48953));case 2:return e.abrupt("return",(a=e.sent).default.apply(a,c));case 3:case"end":return e.stop()}},u)}));function s(){return r.apply(this,arguments)}return s}()}}}},92827:function(i,t,n){n.r(t),n.d(t,{texts:function(){return l}});const l=[{value:"\u7BA1\u7406\u5168\u5C4F\u72B6\u6001\u7684 Hook\u3002",paraId:0,tocIndex:0},{value:`function useFullscreen(
  ref?: RefType,
  options?: {
    onEnter?: () => void;
    onExit?: () => void;
  }
): {
  isFullscreen: boolean;
  enter: () => void;
  exit: () => void;
  toggle: () => void;
};
`,paraId:1,tocIndex:5},{value:"\u53C2\u6570",paraId:2,tocIndex:6},{value:"\u8BF4\u660E",paraId:2,tocIndex:6},{value:"\u7C7B\u578B",paraId:2,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:2,tocIndex:6},{value:"ref",paraId:2,tocIndex:6},{value:"Dom \u8282\u70B9\u6216 Ref \u5BF9\u8C61\u3002\u5982\u679C\u4E0D\u4F20\uFF0C\u5219\u9ED8\u8BA4\u4F7F\u7528 document.documentElement",paraId:2,tocIndex:6},{value:"RefType",paraId:2,tocIndex:6},{value:"-",paraId:2,tocIndex:6},{value:"options",paraId:2,tocIndex:6},{value:"\u914D\u7F6E\u9879",paraId:2,tocIndex:6},{value:"{ onEnter?: () => void; onExit?: () => void; }",paraId:2,tocIndex:6},{value:"{}",paraId:2,tocIndex:6},{value:"options.onEnter",paraId:2,tocIndex:6},{value:"\u8FDB\u5165\u5168\u5C4F\u65F6\u7684\u56DE\u8C03",paraId:2,tocIndex:6},{value:"() => void",paraId:2,tocIndex:6},{value:"-",paraId:2,tocIndex:6},{value:"options.onExit",paraId:2,tocIndex:6},{value:"\u9000\u51FA\u5168\u5C4F\u65F6\u7684\u56DE\u8C03",paraId:2,tocIndex:6},{value:"() => void",paraId:2,tocIndex:6},{value:"-",paraId:2,tocIndex:6},{value:"\u8FD4\u56DE\u503C",paraId:3,tocIndex:7},{value:"\u8BF4\u660E",paraId:3,tocIndex:7},{value:"\u7C7B\u578B",paraId:3,tocIndex:7},{value:"isFullscreen",paraId:3,tocIndex:7},{value:"\u5F53\u524D\u662F\u5426\u4E3A\u5168\u5C4F\u72B6\u6001",paraId:3,tocIndex:7},{value:"boolean",paraId:3,tocIndex:7},{value:"enter",paraId:3,tocIndex:7},{value:"\u8FDB\u5165\u5168\u5C4F\u7684\u65B9\u6CD5",paraId:3,tocIndex:7},{value:"() => void",paraId:3,tocIndex:7},{value:"exit",paraId:3,tocIndex:7},{value:"\u9000\u51FA\u5168\u5C4F\u7684\u65B9\u6CD5",paraId:3,tocIndex:7},{value:"() => void",paraId:3,tocIndex:7},{value:"toggle",paraId:3,tocIndex:7},{value:"\u5207\u6362\u5168\u5C4F\u72B6\u6001\u7684\u65B9\u6CD5",paraId:3,tocIndex:7},{value:"() => void",paraId:3,tocIndex:7},{value:"\u6D4F\u89C8\u5668\u5168\u5C4F API \u5728\u4E0D\u540C\u6D4F\u89C8\u5668\u4E2D\u6709\u4E0D\u540C\u7684\u5B9E\u73B0\uFF0C\u672C Hook \u5DF2\u505A\u4E86\u517C\u5BB9\u6027\u5904\u7406\uFF0C\u652F\u6301\u4E3B\u6D41\u6D4F\u89C8\u5668\u3002",paraId:4,tocIndex:8},{value:"\u5168\u5C4F\u64CD\u4F5C\u9700\u8981\u7528\u6237\u4EA4\u4E92\u89E6\u53D1\uFF0C\u5426\u5219\u53EF\u80FD\u4F1A\u88AB\u6D4F\u89C8\u5668\u963B\u6B62\u3002",paraId:4,tocIndex:8},{value:"\u5728\u67D0\u4E9B\u6D4F\u89C8\u5668\u4E2D\uFF0C\u5168\u5C4F\u72B6\u6001\u53EF\u80FD\u4F1A\u88AB\u7528\u6237\u624B\u52A8\u9000\u51FA\uFF0C\u672C Hook \u4F1A\u76D1\u542C\u5168\u5C4F\u72B6\u6001\u7684\u53D8\u5316\u5E76\u66F4\u65B0 isFullscreen \u503C\u3002",paraId:4,tocIndex:8}]},1100:function(i,t){t.Z=`import React, { useRef } from 'react';
import { useFullscreen } from 'rc-hooks';

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggle } = useFullscreen(ref);

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: '300px',
          height: '300px',
          background: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <div style={{ marginBottom: '20px' }}>\u70B9\u51FB\u6309\u94AE\u5207\u6362\u5168\u5C4F</div>
        <button onClick={toggle} style={{ marginBottom: '20px' }}>
          {isFullscreen ? '\u9000\u51FA\u5168\u5C4F' : '\u8FDB\u5165\u5168\u5C4F'}
        </button>
        <div>\u5F53\u524D\u72B6\u6001: {isFullscreen ? '\u5168\u5C4F' : '\u975E\u5168\u5C4F'}</div>
      </div>
    </div>
  );
};
`},79843:function(i,t){t.Z=`import React, { useRef, useState } from 'react';
import { useFullscreen } from 'rc-hooks';

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');

  const { isFullscreen, toggle } = useFullscreen(ref, {
    onEnter: () => {
      setMessage('\u8FDB\u5165\u5168\u5C4F');
    },
    onExit: () => {
      setMessage('\u9000\u51FA\u5168\u5C4F');
    }
  });

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: '300px',
          height: '300px',
          background: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <div style={{ marginBottom: '20px' }}>\u70B9\u51FB\u6309\u94AE\u5207\u6362\u5168\u5C4F</div>
        <button onClick={toggle} style={{ marginBottom: '20px' }}>
          {isFullscreen ? '\u9000\u51FA\u5168\u5C4F' : '\u8FDB\u5165\u5168\u5C4F'}
        </button>
        <div style={{ marginBottom: '20px' }}>\u5F53\u524D\u72B6\u6001: {isFullscreen ? '\u5168\u5C4F' : '\u975E\u5168\u5C4F'}</div>
        <div style={{ color: '#666' }}>\u6D88\u606F: {message}</div>
      </div>
    </div>
  );
};
`},86221:function(i,t){t.Z=`import React from 'react';
import { useFullscreen } from 'rc-hooks';

export default () => {
  const { isFullscreen, toggle } = useFullscreen();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '300px',
          height: '300px',
          background: '#f0f0f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        <div style={{ marginBottom: '20px' }}>\u70B9\u51FB\u6309\u94AE\u5207\u6362\u5168\u5C4F (\u65E0 ref\uFF0C\u5C06\u5168\u5C4F\u6574\u4E2A\u6587\u6863)</div>
        <button onClick={toggle} style={{ marginBottom: '20px' }}>
          {isFullscreen ? '\u9000\u51FA\u5168\u5C4F' : '\u8FDB\u5165\u5168\u5C4F'}
        </button>
        <div>\u5F53\u524D\u72B6\u6001: {isFullscreen ? '\u5168\u5C4F' : '\u975E\u5168\u5C4F'}</div>
      </div>
    </div>
  );
};
`}}]);
