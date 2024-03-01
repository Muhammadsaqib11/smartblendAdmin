import { FC, useState } from 'react';

import { Button,  Input, Select, Table, Tooltip, Typography } from 'antd';
import { SearchOutlined ,FilterFilled,PlusCircleOutlined} from '@ant-design/icons';
import {  MailOutlined } from '@ant-design/icons';
import PhoneOutlined from '@mui/icons-material/LocalPhone';
import UserOutlined from '@mui/icons-material/Email';
import { LocaleFormatter } from '@/locales';
import { useNavigate } from 'react-router-dom';
import ProductTrackingModal from './ProductTrackingModal';
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ProductTrackingModal from './ProductTrackingModal';
const { Title, Paragraph } = Typography;

const div = <div style={{ height: 200 }}>2333</div>;
const { Search } = Input;

const OrdersPage: FC = () => {
  const [isProductTrackingModalVisible, setProductTrackingModalVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const openProductTrackingModal = () => {
    setProductTrackingModalVisible(true);
  };

  const closeProductTrackingModal = () => {
    setProductTrackingModalVisible(false);
  };
const navigate=useNavigate()
  const onSearch = (value:any) => {
    console.log(value); // Handle search functionality here
  }
  const columns = [
    {
      title: 'Order#',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text:any, record:any) => (
        <Tooltip
        color={'#ECECEC'}
        title={<>
        <p className='font-weight-medium text-black 'style={{color:"#000"}}>{record.customerName}</p>
        <p className='fs-8' style={{color:'#0C8CE9',textDecoration:'underline'}}>
            <PhoneOutlined fontSize='small' className='mr-1  ' /> +92 345 6789 100
          </p>
          <p className='fs-8' style={{color:'#0C8CE9',textDecoration:'underline'}}>
            <UserOutlined fontSize='small' className='mr-1  '  />example@email.com
          </p>

        </>}>
          <span className='' style={{cursor:'pointer'}}>
           {text}
          </span>
        </Tooltip>
      ),
    
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Construction Site Address',
      dataIndex: 'constructionSiteAddress',
      key: 'constructionSiteAddress',
    },
    {
      title: 'Expected Delivery Date',
      dataIndex: 'expectedDeliveryDate',
      key: 'expectedDeliveryDate',
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (text:any) => {
        let backgroundColor = '#FFFFFF'; // Default background color
  
        if (text === 'Invoice Pending') {
          backgroundColor = '#FF4500';
        } else if (text === 'Condition Pending') {
          backgroundColor = '#FFA500';
        } else if (text === 'In Production') {
          backgroundColor = '#4CAF50';
        } else if (text === 'Ready for Delivery') {
          backgroundColor = '#2196F3';
        } else if (text === 'On Site') {
          backgroundColor = '#795548';
        }
  
        return <Button className='text-white' style={{ backgroundColor, padding: '6px', borderRadius: '14px', }}>{text}</Button>;
      },
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <span className='d-flex'>
          <Button className='' style={{ background: '#ECECEC' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<g clip-path="url(#clip0_5644_280)">
<path d="M15 15.8333H5C4.54167 15.8333 4.16667 15.4583 4.16667 15V5C4.16667 4.54167 4.54167 4.16667 5 4.16667H9.16667C9.625 4.16667 10 3.79167 10 3.33333C10 2.875 9.625 2.5 9.16667 2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10.8333C17.5 10.375 17.125 10 16.6667 10C16.2083 10 15.8333 10.375 15.8333 10.8333V15C15.8333 15.4583 15.4583 15.8333 15 15.8333ZM11.6667 3.33333C11.6667 3.79167 12.0417 4.16667 12.5 4.16667H14.6583L7.05 11.775C6.725 12.1 6.725 12.625 7.05 12.95C7.375 13.275 7.9 13.275 8.225 12.95L15.8333 5.34167V7.5C15.8333 7.95833 16.2083 8.33333 16.6667 8.33333C17.125 8.33333 17.5 7.95833 17.5 7.5V3.33333C17.5 2.875 17.125 2.5 16.6667 2.5H12.5C12.0417 2.5 11.6667 2.875 11.6667 3.33333Z" fill="#333333"/>
</g>
<defs>
<clipPath id="clip0_5644_280">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg></Button>
          <Button
          
          onClick={openProductTrackingModal}
          className='' style={{ background: '#ECECEC', marginLeft: '8px' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<g clip-path="url(#clip0_5644_286)">
<path d="M16.2502 6.66665H14.1668V4.99998C14.1668 4.08331 13.4168 3.33331 12.5002 3.33331H2.50016C1.5835 3.33331 0.833496 4.08331 0.833496 4.99998V12.5C0.833496 13.4166 1.5835 14.1666 2.50016 14.1666C2.50016 15.55 3.61683 16.6666 5.00016 16.6666C6.3835 16.6666 7.50016 15.55 7.50016 14.1666H12.5002C12.5002 15.55 13.6168 16.6666 15.0002 16.6666C16.3835 16.6666 17.5002 15.55 17.5002 14.1666H18.3335C18.7918 14.1666 19.1668 13.7916 19.1668 13.3333V10.5583C19.1668 10.2 19.0502 9.84998 18.8335 9.55831L16.9168 6.99998C16.7585 6.79165 16.5085 6.66665 16.2502 6.66665ZM5.00016 15C4.54183 15 4.16683 14.625 4.16683 14.1666C4.16683 13.7083 4.54183 13.3333 5.00016 13.3333C5.4585 13.3333 5.8335 13.7083 5.8335 14.1666C5.8335 14.625 5.4585 15 5.00016 15ZM16.2502 7.91665L17.8835 9.99998H14.1668V7.91665H16.2502ZM15.0002 15C14.5418 15 14.1668 14.625 14.1668 14.1666C14.1668 13.7083 14.5418 13.3333 15.0002 13.3333C15.4585 13.3333 15.8335 13.7083 15.8335 14.1666C15.8335 14.625 15.4585 15 15.0002 15Z" fill="#333333"/>
</g>
<defs>
<clipPath id="clip0_5644_286">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg></Button>
        </span>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      orderNumber: 'ORD123',
      customerId: 'CUST001',
      customerName: 'John Doe',
      type: 'Type A',
      constructionSiteAddress: '123 Main St, City',
      expectedDeliveryDate: '2022-02-28',
      orderStatus: 'Invoice Pending',
      totalAmount: 500,
    },
    {
      key: '2',
      orderNumber: 'ORD124',
      customerId: 'CUST002',
      customerName: 'Jane Smith',
      type: 'Type B',
      constructionSiteAddress: '456 Oak St, Town',
      expectedDeliveryDate: '2022-03-15',
      orderStatus: 'Condition Pending',
      totalAmount: 750,
    },
    {
      key: '3',
      orderNumber: 'ORD125',
      customerId: 'CUST003',
      customerName: 'Bob Johnson',
      type: 'Type C',
      constructionSiteAddress: '789 Pine St, Village',
      expectedDeliveryDate: '2022-04-01',
      orderStatus: 'In Production',
      totalAmount: 1000,
    },
    {
      key: '4',
      orderNumber: 'ORD126',
      customerId: 'CUST004',
      customerName: 'Alice Brown',
      type: 'Type A',
      constructionSiteAddress: '101 Elm St, Hamlet',
      expectedDeliveryDate: '2022-04-20',
      orderStatus: 'Ready for Delivery',
      totalAmount: 1200,
    },
    {
      key: '5',
      orderNumber: 'ORD127',
      customerId: 'CUST005',
      customerName: 'Charlie Wilson',
      type: 'Type B',
      constructionSiteAddress: '202 Maple St, Suburb',
      expectedDeliveryDate: '2022-05-05',
      orderStatus: 'On Site',
      totalAmount: 900,
    },
    {
      key: '6',
      orderNumber: 'ORD123',
      customerId: 'CUST001',
      customerName: 'John Doe',
      type: 'Type A',
      constructionSiteAddress: '123 Main St, City',
      expectedDeliveryDate: '2022-02-28',
      orderStatus: 'Invoice Pending',
      totalAmount: 500,
    },
    {
      key: '7',
      orderNumber: 'ORD124',
      customerId: 'CUST002',
      customerName: 'Jane Smith',
      type: 'Type B',
      constructionSiteAddress: '456 Oak St, Town',
      expectedDeliveryDate: '2022-03-15',
      orderStatus: 'Condition Pending',
      totalAmount: 750,
    },
    {
      key: '8',
      orderNumber: 'ORD125',
      customerId: 'CUST003',
      customerName: 'Bob Johnson',
      type: 'Type C',
      constructionSiteAddress: '789 Pine St, Village',
      expectedDeliveryDate: '2022-04-01',
      orderStatus: 'In Production',
      totalAmount: 1000,
    },
    {
      key: '9',
      orderNumber: 'ORD126',
      customerId: 'CUST004',
      customerName: 'Alice Brown',
      type: 'Type A',
      constructionSiteAddress: '101 Elm St, Hamlet',
      expectedDeliveryDate: '2022-04-20',
      orderStatus: 'Ready for Delivery',
      totalAmount: 1200,
    },
    {
      key: '10',
      orderNumber: 'ORD127',
      customerId: 'CUST005',
      customerName: 'Charlie Wilson',
      type: 'Type B',
      constructionSiteAddress: '202 Maple St, Suburb',
      expectedDeliveryDate: '2022-05-05',
      orderStatus: 'On Site',
      totalAmount: 900,
    },
    {
      key: '11',
      orderNumber: 'ORD123',
      customerId: 'CUST001',
      customerName: 'John Doe',
      type: 'Type A',
      constructionSiteAddress: '123 Main St, City',
      expectedDeliveryDate: '2022-02-28',
      orderStatus: 'Invoice Pending',
      totalAmount: 500,
    },
    {
      key: '12',
      orderNumber: 'ORD124',
      customerId: 'CUST002',
      customerName: 'Jane Smith',
      type: 'Type B',
      constructionSiteAddress: '456 Oak St, Town',
      expectedDeliveryDate: '2022-03-15',
      orderStatus: 'Condition Pending',
      totalAmount: 750,
    },
    {
      key: '13',
      orderNumber: 'ORD125',
      customerId: 'CUST003',
      customerName: 'Bob Johnson',
      type: 'Type C',
      constructionSiteAddress: '789 Pine St, Village',
      expectedDeliveryDate: '2022-04-01',
      orderStatus: 'In Production',
      totalAmount: 1000,
    },
    {
      key: '14',
      orderNumber: 'ORD126',
      customerId: 'CUST004',
      customerName: 'Alice Brown',
      type: 'Type A',
      constructionSiteAddress: '101 Elm St, Hamlet',
      expectedDeliveryDate: '2022-04-20',
      orderStatus: 'Ready for Delivery',
      totalAmount: 1200,
    },
    {
      key: '15',
      orderNumber: 'ORD127',
      customerId: 'CUST005',
      customerName: 'Charlie Wilson',
      type: 'Type B',
      constructionSiteAddress: '202 Maple St, Suburb',
      expectedDeliveryDate: '2022-05-05',
      orderStatus: 'On Site',
      totalAmount: 900,
    },
    // Add more dummy data as needed
  ];
    
  return (
    <div className='container-fluid px-0 bg-white' style={{overflowX:'hidden'}}>

         <div className="bg-white p-3 row mb-3 " style={{top:-6,position:'relative'}}>
          <div className="col-md-3 col-6 mb-2 pr-0">
          <Input
          className='radius-large'
        placeholder="Search"
        // onSearch={onSearch}
        size='large'
        suffix ={<SearchOutlined />}
      />
          </div>
       <div className="col-md-2 col-6 mb-2">
       <Select  listItemHeight={33} size='large' className='w-100 radius-large' placeholder="Customer Type">
            <Select.Option value="This week">
            This week
            </Select.Option>
            
          </Select>
       </div>
         <div className="col-md-2 col-6 mb-2 pr-0">
         <Select size='large' className='w-100 radius-large' placeholder="Order Status">
            <Select.Option value="This week">
            This week
            </Select.Option>
            
          </Select>
         </div>
      
      <div className="col-md-2 col-6 mb-2">
      <DatePicker placeholderText='Select date' selected={startDate} onChange={(date) => setStartDate(date)}    className='radius-large w-100 px-2' />

      </div>
    
        <div className="col-md-3 d-flex justify-content-between align-items-center">
          <div className='pr-4'>
          <span className="notice " id="notice-center"
                 
                 //  onClick={()=>setLogoutModalVisible(true)}
                  >
           <FilterFilled />
                  {/* <BellFilled style={{width:15}} /> */}
                </span>
          </div>
      
          <Button size='large' className='radius-large' type='primary'
          onClick={()=>{navigate('new-order')}}
          >
          <PlusCircleOutlined style={{top:-3,position:"relative"}} />
            New Order</Button>
        </div>
        </div>
        <div className="px-3">
        <Table
        bordered
      scroll={{ x: scrollX }}
      columns={columns}
      dataSource={data}
      pagination={false}
  
    />
     </div>
      <ProductTrackingModal
        visible={isProductTrackingModalVisible}
        onCancel={closeProductTrackingModal}
      />
    </div>
  );
};

export default OrdersPage;
