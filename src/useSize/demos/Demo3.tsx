import React, { useRef } from 'react';
import { Line } from '@ant-design/charts';
import { useSize } from 'rc-hooks';

const Demo: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useSize(ref);

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 }
  ];
  const config = {
    width,
    height: 400,
    data,
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4
    },
    interaction: {
      tooltip: {
        marker: false
      }
    },
    style: {
      lineWidth: 2
    }
  };
  console.log('render width', width);
  return (
    <div>
      <div ref={ref}></div>
      <Line {...config} />
    </div>
  );
};

export default Demo;
