"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[5921],{65296:function(a,t,e){var o;e.r(t),e.d(t,{demos:function(){return v}});var f=e(90228),r=e.n(f),p=e(87999),c=e.n(p),s=e(75271),h=e(39508),v={"src-use-size-demo-demo1":{component:s.memo(s.lazy(function(){return Promise.all([e.e(5173),e.e(1918),e.e(9046),e.e(8996),e.e(2433)]).then(e.bind(e,7031))})),asset:{type:"BLOCK",id:"src-use-size-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(69550).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.20"}},entry:"index.tsx"},context:{react:o||(o=e.t(s,2)),"rc-hooks":h},renderOpts:{compile:function(){var d=c()(r()().mark(function i(){var l,m=arguments;return r()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all([e.e(1620),e.e(1948)]).then(e.bind(e,81948));case 2:return n.abrupt("return",(l=n.sent).default.apply(l,m));case 3:case"end":return n.stop()}},i)}));function u(){return d.apply(this,arguments)}return u}()}},"src-use-size-demo-demo2":{component:s.memo(s.lazy(function(){return Promise.all([e.e(5173),e.e(1918),e.e(9046),e.e(8996),e.e(2433)]).then(e.bind(e,44156))})),asset:{type:"BLOCK",id:"src-use-size-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(54888).Z},react:{type:"NPM",value:"18.3.1"},"rc-hooks":{type:"NPM",value:"3.0.20"}},entry:"index.tsx"},context:{react:o||(o=e.t(s,2)),"rc-hooks":h},renderOpts:{compile:function(){var d=c()(r()().mark(function i(){var l,m=arguments;return r()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.all([e.e(1620),e.e(1948)]).then(e.bind(e,81948));case 2:return n.abrupt("return",(l=n.sent).default.apply(l,m));case 3:case"end":return n.stop()}},i)}));function u(){return d.apply(this,arguments)}return u}()}}}},98546:function(a,t,e){e.r(t),e.d(t,{texts:function(){return o}});const o=[{value:"\u83B7\u53D6\u5E76\u76D1\u542C dom \u8282\u70B9\u7684\u5BBD\u9AD8\u3002",paraId:0,tocIndex:0},{value:`const size = useSize(ref: (() => HTMLElement) | HTMLElement | MutableRefObject<HTMLElement>);
`,paraId:1,tocIndex:4},{value:"\u53C2\u6570",paraId:2,tocIndex:5},{value:"\u8BF4\u660E",paraId:2,tocIndex:5},{value:"\u7C7B\u578B",paraId:2,tocIndex:5},{value:"size",paraId:2,tocIndex:5},{value:"dom",paraId:2,tocIndex:5},{value:" \u8282\u70B9\u7684\u5C3A\u5BF8\u3002",paraId:2,tocIndex:5},{value:"{ width?:number; height?: number; }",paraId:2,tocIndex:5}]},69550:function(a,t){t.Z=`import React, { useRef } from 'react';
import { useSize } from 'rc-hooks';

function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      <p>rect value: {JSON.stringify(size)}</p>
    </>
  );
}

export default Demo;
`},54888:function(a,t){t.Z=`import React, { useEffect, useRef, useState } from 'react';
import { useSize } from 'rc-hooks';

type SizeType = { width?: number; height?: number };

function Table({ onSizeChange }: { onSizeChange?: (size: SizeType) => void }) {
  const tableRef = useRef<HTMLTableElement>(null);
  const size = useSize(tableRef);

  useEffect(() => {
    onSizeChange?.(size);
  }, [onSizeChange, size]);

  return (
    <table ref={tableRef} style={{ tableLayout: 'fixed', width: '80%', textAlign: 'center' }}>
      <thead>
        <tr>
          <th>\u59D3\u540D</th>
          <th>\u5E74\u9F84</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>foo</td>
          <td>11</td>
        </tr>
        <tr>
          <td>bar</td>
          <td>12</td>
        </tr>
      </tbody>
    </table>
  );
}

function Demo() {
  const [tableSize, setTableSize] = useState<SizeType>({});
  const [visible, setVisible] = useState(false);
  const size = useSize(() => document.body);

  const handleVisible = () => {
    setVisible((v) => {
      if (v) {
        setTableSize({});
      }
      console.log('12');
      return !v;
    });
  };

  return (
    <>
      <button onClick={handleVisible}>\u5207\u6362\u663E\u793A/\u9690\u85CF</button>
      <p>body value: {JSON.stringify(size)}</p>
      <p>table value: {JSON.stringify(tableSize)}</p>
      {visible && <Table onSizeChange={setTableSize} />}
    </>
  );
}

export default Demo;
`}}]);
