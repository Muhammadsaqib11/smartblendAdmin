import { InfoCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Card, Col, Progress, Row, Select, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useLocale } from '@/locales';

import { ReactComponent as CaretDownIcon } from './assets/caret-down.svg';
import { ReactComponent as CaretUpIcon } from './assets/caret-up.svg';
import TestCom from './test';
import LineChartComponent from './LineChartComponent';
import BarChartExample from './BarChartExample';

// const data = [
//   { name: 'Jan', value: 100 },
//   { name: 'Feb', value: 60 },
//   { name: 'Mar', value: 20 },
//   { name: 'Apr', value: -20 },
//   { name: 'May', value: -60 },
//   { name: 'Jun', value: -10 },
//   { name: 'Jul', value: 0 },
//   { name: 'Aug', value: 100 },
//   { name: 'Sep', value: 60 },
//   { name: 'Oct', value: 20 },
//   { name: 'Nov', value: -20 },
//   { name: 'Dec', value: -60 },
// ];

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: -3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: -2000,
    pv: -9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: -1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: -3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const wrapperCol = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 6,
  xl: 6,
  xxl: 6,
};
const wrapperColSecondRow = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 8,
};

const Tableedata = [
  {
    key: '1',
    user: {
      avatar: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'John Doe',
    },
    quantity: 10,
    amount: 100.00,
  },
  {
    key: '2',
    user: {
      avatar: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'Jane Doe',
    },
    quantity: 25,
    amount: 225.50,
  },
  {
    key: '3',
    user: {
      avatar: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'Alice Johnson',
    },
    quantity: 15,
    amount: 137.99,
  },
];const columns = [
  {
    title: 'Name',
    dataIndex: 'user',
    key: 'user',
    render: (user) => (
      <div>
        <Avatar src={user?.avatar} size={40} />
        <span style={{ marginLeft: 8 }}>{user.name}</span>
      </div>
    ),
  },
  {
    title: 'Orders',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];
const OrderTableedata = [
  {
    key: '1',
    user: {
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'John Doe',
    },
    quantity: 10,
    amount: 100.00,
  },
  {
    key: '2',
    user: {
      avatar: 'https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'Jane Doe',
    },
    quantity: 25,
    amount: 225.50,
  },
  {
    key: '3',
    user: {
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'Alice Johnson',
    },
    quantity: 15,
    amount: 137.99,
  },
];const Ordercolumns = [
  {
    title: 'Customer Name',
    dataIndex: 'user',
    key: 'user',
    render: (user) => (
      <div>
        <Avatar src={user?.avatar} size={40} />
        <span style={{ marginLeft: 8 }}>{user.name}</span>
      </div>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];
const ProductTableedata = [
  {
    key: '1',
    user: {
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'John Doe',
    },
    quantity: 10,
    amount: 100.00,
  },
  {
    key: '2',
    user: {
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'Jane Doe',
    },
    quantity: 25,
    amount: 225.50,
  },
  {
    key: '3',
    user: {
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
      name: 'Alice Johnson',
    },
    quantity: 15,
    amount: 137.99,
  },
];const Productcolumns = [
  {
    title: 'Name',
    dataIndex: 'user',
    key: 'user',
    render: (user) => (
      <div>
        <Avatar src={user?.avatar} size={40} />
        <span style={{ marginLeft: 8 }}>{user.name}</span>
      </div>
    ),
  },
  {
    title: 'Items',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];
const ColCard = ({ metaName, metaCount, body, footer, loading, wrapperCol }) => {
  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="overview" bordered={false} style={{ height: 400 }}>
        <div className="overview-header border-bottom  ">
          <div className="fs-3 font-weight-medium ">{metaName}</div>
          <div className="text-primary fs-2 font-weight-medium">{metaCount}</div>
          <div className="font-weight-medium pb-3">Secondary text</div>
        </div>
        <div className="overview-body pt-3">{body}</div>
        {/* <div className="overview-footer">{footer}</div> */}
      </Card>
    </Col>
  );
};

const Overview = ({ loading }) => {
  const { formatMessage } = useLocale();

  return (
    <div className='container-fluid p-0 overflow-hidden' >
        <div className="bg-white p-3 row mb-3 " style={{top:-6,position:'relative'}}>
          <div className="col-md-3 col-6 mb-2 pr-0">
          <Select size='large' className='w-100' placeholder="Week Filter">
            <Select.Option value="This week">
            This week
            </Select.Option>

          </Select>
          </div>
       <div className="col-md-3 col-6 mb-2 pr-0">
       <Select size='large' className='w-100' placeholder="Product Filter">
            <Select.Option value="This week">
            This week
            </Select.Option>
            
          </Select>
       </div>
         <div className="col-md-3 col-6 mb-2 pr-0">
         <Select size='large' className='w-100' placeholder="Order Status">
            <Select.Option value="This week">
            This week
            </Select.Option>
            
          </Select>
         </div>
      
      <div className="col-md-3 col-6 mb-2">
      <Select size='large' className='w-100' placeholder="Customer Filter">
            <Select.Option value="This week">
            This week
            </Select.Option>
            
          </Select>
      </div>
        
        </div>
        <div className="px-3">  

      <Row gutter={[12, 12]} className="mb-2">
        <ColCard
          wrapperCol={wrapperCol}
          loading={loading}
          metaName={formatMessage({ id: 'app.dashboard.overview.payments' })}
          // css={{fontSize:172}}
          metaCount="6560"
          body={
              <TestCom />
                      }
        />
        <ColCard
          wrapperCol={wrapperCol}
          loading={loading}
          metaName={formatMessage({ id: 'app.dashboard.overview.payments' })}
          // css={{fontSize:172}}
          metaCount="6560"
          body={
            <ResponsiveContainer width="100%">
              <TestCom />
            </ResponsiveContainer>
          }
        />
        <ColCard
          wrapperCol={wrapperCol}
          loading={loading}
          metaName={formatMessage({ id: 'app.dashboard.overview.payments' })}
          // css={{fontSize:172}}
          metaCount="6560"
          body={
            <ResponsiveContainer width="100%">
              <TestCom />
            </ResponsiveContainer>
          }
        />
        <ColCard
          wrapperCol={wrapperCol}
          loading={loading}
          metaName={formatMessage({ id: 'app.dashboard.overview.payments' })}
          // css={{fontSize:172}}
          metaCount="6560"
          body={
            <ResponsiveContainer width="100%">
              <TestCom />
            </ResponsiveContainer>
          }
        />
      </Row>
      <Row gutter={[12, 12]} className="mb-2">
        <ColCard
          wrapperCol={wrapperColSecondRow}
          loading={loading}
          metaName={formatMessage({ id: 'app.dashboard.overview.payments' })}
          // css={{fontSize:172}}
          metaCount="6560"
          body={
            <ResponsiveContainer width="100%">
              <LineChartComponent />
            </ResponsiveContainer>
          }
        />
        <ColCard
          wrapperCol={wrapperColSecondRow}
          loading={loading}
          metaName={formatMessage({ id: 'app.dashboard.overview.payments' })}
          // css={{fontSize:172}}
          metaCount="6560"
          body={
            <ResponsiveContainer width="100%">
              <LineChartComponent />
            </ResponsiveContainer>
          }
        />
        <ColCard
          wrapperCol={wrapperColSecondRow}
          loading={loading}
          metaName={formatMessage({ id: 'app.dashboard.overview.payments' })}
          // css={{fontSize:172}}
          metaCount="6560"
          body={
            <ResponsiveContainer width="100%">
              <BarChartExample />
            </ResponsiveContainer>
          }
        />
          <Col {...wrapperColSecondRow}>
      <Card   loading={loading} className="customerCard blueHederTable p-1" bordered={false} style={{background:'#ECECEC'}}>
     <h4 className='text-center mb-3'>Top Customers</h4>
     <Table
      columns={columns}
      dataSource={Tableedata}
      pagination={false}
      style={{
        header: {
          backgroundColor: 'red',
          color: 'white',
        },
      }}
    />
      </Card>
    </Col>
   
    <Col {...wrapperColSecondRow}>
      <Card   loading={loading} className="customerCard blueHederTable p-1" bordered={false} style={{background:'#ECECEC'}}>
     <h4 className='text-center mb-3'>Top Products</h4>
     <Table
      columns={Productcolumns}
      dataSource={ProductTableedata}
      pagination={false}
      style={{
        header: {
          backgroundColor: 'red',
          color: 'white',
        },
      }}
    />
      </Card>
    </Col>
    <Col {...wrapperColSecondRow}>
      <Card   loading={loading} className="customerCard blueHederTable p-1" bordered={false} style={{background:'#ECECEC'}}>
     <h4 className='text-center mb-3'>Top Orders</h4>
     <Table
      columns={Ordercolumns}
      dataSource={OrderTableedata}
      pagination={false}
      style={{
        header: {
          backgroundColor: 'red',
          color: 'white',
        },
      }}
    />
      </Card>
    </Col>
      </Row>
        </div>
     
    
    </div>
  );
};

export default Overview;
