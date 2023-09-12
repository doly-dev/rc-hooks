import React, { useEffect, useRef, useState } from 'react';
import { useSize } from 'rc-hooks';

type SizeType = { width?: number; height?: number; };

function Table({ onSizeChange }: { onSizeChange?: (size: SizeType) => void; }) {
  const tableRef = useRef<HTMLTableElement>(null);
  const size = useSize(tableRef);

  useEffect(() => {
    onSizeChange?.(size);
  }, [onSizeChange, size]);

  return (
    <table ref={tableRef} style={{ tableLayout: 'fixed', width: '80%', textAlign: 'center' }}>
      <thead>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
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
  )
}

function Demo() {
  const [tableSize, setTableSize] = useState<SizeType>({});
  const [visible, setVisible] = useState(false);
  const size = useSize(() => document.body);

  const handleVisible = () => {
    setVisible(v => {
      if (v) {
        setTableSize({});
      }
      console.log('12');
      return !v;
    })
  }

  return (
    <>
      <button onClick={handleVisible}>切换显示/隐藏</button>
      <p>body value: {JSON.stringify(size)}</p>
      <p>table value: {JSON.stringify(tableSize)}</p>
      {
        visible && (
          <Table onSizeChange={setTableSize} />
        )
      }
    </>
  );
}

export default Demo;
