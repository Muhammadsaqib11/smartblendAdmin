import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Product1: -10, Product2: 5, Product3: 15 },
  { name: 'Feb', Product1: 12, Product2: 6, Product3: 18 },
  { name: 'Mar', Product1: 14, Product2: 7, Product3: 21 },
  { name: 'Apr', Product1: -16, Product2: 8, Product3: -24 },
  { name: 'May', Product1: 18, Product2: 9, Product3: 27 },
  { name: 'Jun', Product1: -20, Product2: -10, Product3: -30 },
];

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const RoundedBarChartComponent = () => {
  return (
    <div style={{ width: "100%", height: 330 }}>
    <ResponsiveContainer>
    <LineChart
     width={400}
     height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" tick={<CustomizedAxisTick />} />
      <YAxis  domain={[-30, 30]}/>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Product1" name="Product 1" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Product2" name="Product 2" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Product3" name="Product 3" stroke="#ffc658" />
    </LineChart>
    </ResponsiveContainer>
    </div>
  );
};

export default RoundedBarChartComponent;