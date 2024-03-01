import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
} from 'recharts';

const data = [
  { name: 'Jan', Product1: -10, Product2: 5, Product3: 15 },
  { name: 'Feb', Product1: 12, Product2: 6, Product3: 18 },
  { name: 'Mar', Product1: 14, Product2: 7, Product3: 21 },
  { name: 'Apr', Product1: -16, Product2: 8, Product3: -24 },
  { name: 'May', Product1: 18, Product2: 9, Product3: 27 },
  { name: 'Jun', Product1: -20, Product2: -10, Product3: -30 },
];

const CustomizedAxisTick = props => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
        {payload.value}
      </text>
    </g>
  );
};

const LineChartComponent = () => {
  return (
    <div style={{ width: '100%', height: 230 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Product3"
            // stroke="#2B547E"
            // fill="#2B547E"
          />
          <Line type="monotone" dataKey="Product2" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
        {/* <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Product1" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Product2" stroke="#82ca9d" />
        </LineChart> */}
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
