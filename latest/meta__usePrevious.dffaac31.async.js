"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[6438],{23301:function(r,t,e){var o;e.r(t),e.d(t,{demos:function(){return h}});var i=e(90228),u=e.n(i),I=e(87999),p=e.n(I),a=e(75271),v=e(56439),h={"src-use-previous-demo-demo1":{component:a.memo(a.lazy(function(){return Promise.all([e.e(5217),e.e(6526),e.e(8493),e.e(7865),e.e(2433)]).then(e.bind(e,30366))})),asset:{type:"BLOCK",id:"src-use-previous-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(19556).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.16"}},entry:"index.tsx"},context:{react:o||(o=e.t(a,2)),"rc-hooks":v},renderOpts:{compile:function(){var l=p()(u()().mark(function m(){var s,c=arguments;return u()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all([e.e(1620),e.e(9193)]).then(e.bind(e,19193));case 2:return n.abrupt("return",(s=n.sent).default.apply(s,c));case 3:case"end":return n.stop()}},m)}));function d(){return l.apply(this,arguments)}return d}()}},"src-use-previous-demo-demo2":{component:a.memo(a.lazy(function(){return Promise.all([e.e(5217),e.e(6526),e.e(8493),e.e(7865),e.e(2433)]).then(e.bind(e,44346))})),asset:{type:"BLOCK",id:"src-use-previous-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(27871).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.16"}},entry:"index.tsx"},context:{react:o||(o=e.t(a,2)),"rc-hooks":v},renderOpts:{compile:function(){var l=p()(u()().mark(function m(){var s,c=arguments;return u()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all([e.e(1620),e.e(9193)]).then(e.bind(e,19193));case 2:return n.abrupt("return",(s=n.sent).default.apply(s,c));case 3:case"end":return n.stop()}},m)}));function d(){return l.apply(this,arguments)}return d}()}}}},16996:function(r,t,e){e.r(t),e.d(t,{texts:function(){return o}});const o=[{value:"\u8FD4\u56DE\u4E0A\u4E00\u6B21\u7684 state \u6216 props \u3002",paraId:0,tocIndex:0},{value:`const prevState = usePrevious(state: any);
`,paraId:1,tocIndex:4},{value:"\u53C2\u6570",paraId:2,tocIndex:5},{value:"\u8BF4\u660E",paraId:2,tocIndex:5},{value:"\u7C7B\u578B",paraId:2,tocIndex:5},{value:"prevState",paraId:2,tocIndex:5},{value:"\u4E0A\u4E00\u6B21\u8BB0\u5F55\u7684\u503C\u3002",paraId:2,tocIndex:5},{value:"-",paraId:2,tocIndex:5},{value:"\u53C2\u6570",paraId:3,tocIndex:6},{value:"\u8BF4\u660E",paraId:3,tocIndex:6},{value:"\u7C7B\u578B",paraId:3,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:6},{value:"state",paraId:3,tocIndex:6},{value:"\u9700\u8981\u8BB0\u5F55\u53D8\u5316\u7684\u503C\u3002",paraId:3,tocIndex:6},{value:"-",paraId:3,tocIndex:6},{value:"-",paraId:3,tocIndex:6}]},19556:function(r,t){t.Z=`import React, { useState } from 'react';
import { usePrevious } from 'rc-hooks';

function Demo() {
  const [value, setValue] = useState('');
  const prevValue = usePrevious(value);

  return (
    <>
      <p>Now: {value}</p>
      <p>before: {prevValue}</p>
      <input type="text" onChange={(e) => setValue(e.target.value)} value={value} />
    </>
  );
}

export default Demo;
`},27871:function(r,t){t.Z=`import React, { useState } from 'react';
import { usePrevious } from 'rc-hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const prevValue = usePrevious(value);

  return (
    <>
      <p>Now: {value}</p>
      <p>before: {prevValue}</p>
      <input type="text" onChange={(e) => setValue(e.target.value)} value={value} />
      <p>count: {count}</p>
      <button type="button" onClick={() => setCount((x) => x + 1)}>
        add count
      </button>
    </>
  );
}

export default Demo;
`}}]);
