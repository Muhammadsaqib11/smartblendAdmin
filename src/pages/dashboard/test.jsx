// import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 5,
    pv: 0,
    tv:-3,
    yName: 0
  },
  {
    name: "Feb",
    uv: -10,
    pv: 3,
    yName: -5,
    tv:13,

  },
  {
    name: "Mar",
    uv: 0,
    pv: -8,
    yName: -30,
    tv:8,

  },
  {
    name: "Apr",
    uv: 0,
    pv: 9,
    yName: -10,
    tv:3,

  },
  {
    name: "Mai",
    uv: -8,
    pv: 8,
    yName: 0,
    tv:13,

  },
  {
    name: "Jun",
    uv: 0,
    pv: -20,
    yName: 20,
    tv:13,

  },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100
//   }
];

export default function TestCom() {
  return (
    <div style={{ width: "100%", height: 230 }}>
              <ResponsiveContainer>

    <BarChart
      // width={700}
      // height={250}
      data={data}
      margin={{
        top: 5,
        right: 30,
        // left: -10,
        bottom: 5
      }}
      
    >
      <CartesianGrid  />
      <XAxis dataKey="name" />  
      <YAxis dataKey={"yName"}/>
      <Tooltip />
      <Legend  />
      {/* <ReferenceLine y={0} stroke="#000" /> */}
      <Bar name="Product 1" dataKey="pv" fill="#95C9FF" barSize={40}/>
<Bar name="Product 2" dataKey="uv" fill="#2B547E" barSize={40}/>
<Bar name="Product 3" dataKey="tv" fill="#45A1FF" barSize={40}/>

    </BarChart>
    </ResponsiveContainer>
    </div>
  );
}
