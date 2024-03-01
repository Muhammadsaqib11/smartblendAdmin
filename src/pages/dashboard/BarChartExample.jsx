import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Product1: -1, Product2: 0, Product3: 5 },
  { name: 'Feb', Product1: 2, Product2: 9, Product3: 1 },
  // { name: 'Mar', Product1: 4, Product2: 7, Product3: 1 },
  // { name: 'Apr', Product1: -6, Product2: 8, Product3: -4 },
  // { name: 'May', Product1: 8, Product2: 9, Product3: 2 },
  { name: 'Jun', Product1: -0, Product2: -4, Product3: -3 },
];

export default class BarChartExample extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/tiny-bar-chart-35meb';

  render() {
    return (
      <div style={{ width: '100%', height: 230 }}>
        <ResponsiveContainer>
          <BarChart
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
            <YAxis domain={[-30, 30]} />
            <Tooltip />
            <Legend />
            <Bar type="monotone" dataKey="Product3" stroke="#95C9FF" fill="#95C9FF" radius={[15, 15, 15, 15]} />
            <Bar name="Product 1" dataKey="Product1" fill="#2B547E" radius={[15, 15, 15, 15]} />

            <Bar type="monotone" dataKey="Product2" stroke="#45A1FF" fill="#45A1FF" radius={[15, 15, 15, 15]} />
          </BarChart>
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
  }
}
