import { FC, useState } from 'react';

import { Button,  Input, Select, Table, Tooltip, Typography } from 'antd';
import { SearchOutlined ,FilterFilled,PlusCircleOutlined} from '@ant-design/icons';
import { LocaleFormatter } from '@/locales';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import DoneIcon from '@mui/icons-material/Done';
import DeleteModal from '@/components/Modal/DeleteModal';
import TuneIcon from '@mui/icons-material/Tune';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCustomerModal from '../customer/AddCustomerModal';
import CreateRoleModal from './CreateRoleModal';
const { Title, Paragraph } = Typography;

const div = <div style={{ height: 200 }}>2333</div>;
const { Search } = Input;

const ManageRolePage: FC = () => {
  const [isAddCustomerModalVisible, setAddCustomerModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [isInstalled, setIsInstalled] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleClick = (index:any) => {
    // Toggle the selected row index
    setSelectedRowIndex(selectedRowIndex === index ? null : index);
    setTimeout(() => {
      setIsInstalled(false);
      setSelectedRowIndex(null);
    }, 4000);
  };
  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  }; 
  
  const openAddCustomerModal = () => {
    setAddCustomerModalVisible(true);
  };

  const closeAddCustomerModal = () => {
    setAddCustomerModalVisible(false);
  };
const navigate=useNavigate()
  const onSearch = (value:any) => {
    console.log(value); // Handle search functionality here
  }
  const columns = [
    {
      title: 'Sr#',
      dataIndex: 'Sr',
      key: 'Sr',
    },
    {
      title: 'Role Title',
      dataIndex: 'role',
      key: 'role',
    },
 
    
    {
      title: 'Edit Access',
      dataIndex: 'edit',
      key: 'edit',
    },
    {
      title: 'View Access',
      dataIndex: 'viewAccess',
      key: 'viewAccess',
    },
   
    {
      title: 'Action',
      key: 'action',
      render: (text:any, record:any, index:any) => (
        <span className='d-flex'>
          <Button className='' style={{ background: '#ECECEC' }}>
            <EditIcon />
          </Button>
          <Button onClick={()=>openDeleteModal()} className='' style={{ background: '#ECECEC', marginLeft: '8px' }}>
            <DeleteIcon style={{ color: '#FF0000' }} />
          </Button>
        
        
        </span>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      Sr: 'ORD123',
      role: 'CUST001',
      customerName: 'John Doe',
      edit: 'test@gmail.com',
      viewAccess: '45432-453',
      totalOrders: '24',
      totalAmount: '346$',
      orderDate: '2022-02-28',
    },
    {
      key: '2',
      Sr: 'ORD124',
      role: 'CUST002',
      customerName: 'Jane Smith',
      edit: 'edit B',
      viewAccess: '456 Oak St, Town',
      totalOrders: '2022-03-15',
      totalAmount: 'Condition Pending',
      orderDate: 750,
    },
    {
      key: '3',
      Sr: 'ORD125',
      role: 'CUST003',
      customerName: 'Bob Johnson',
      edit: 'edit C',
      viewAccess: '789 Pine St, Village',
      totalOrders: '2022-04-01',
      totalAmount: 'In Production',
      orderDate: 1000,
    },
    {
      key: '4',
      Sr: 'ORD126',
      role: 'CUST004',
      customerName: 'Alice Brown',
      edit: 'test@gmail.com',
      viewAccess: '101 Elm St, Hamlet',
      totalOrders: '2022-04-20',
      totalAmount: 'Ready for Delivery',
      orderDate: 1200,
    },
    {
      key: '5',
      Sr: 'ORD127',
      role: 'CUST005',
      customerName: 'Charlie Wilson',
      edit: 'edit B',
      viewAccess: '202 Maple St, Suburb',
      totalOrders: '2022-05-05',
      totalAmount: 'On Site',
      orderDate: 900,
    },
    {
      key: '6',
      Sr: 'ORD123',
      role: 'CUST001',
      customerName: 'John Doe',
      edit: 'test@gmail.com',
      viewAccess: '45432-453',
      totalOrders: '24',
      totalAmount: '346$',
      orderDate: '2022-02-28',
    },
    {
      key: '7',
      Sr: 'ORD124',
      role: 'CUST002',
      customerName: 'Jane Smith',
      edit: 'edit B',
      viewAccess: '456 Oak St, Town',
      totalOrders: '2022-03-15',
      totalAmount: 'Condition Pending',
      orderDate: 750,
    },
    {
      key: '8',
      Sr: 'ORD125',
      role: 'CUST003',
      customerName: 'Bob Johnson',
      edit: 'edit C',
      viewAccess: '789 Pine St, Village',
      totalOrders: '2022-04-01',
      totalAmount: 'In Production',
      orderDate: 1000,
    },
    {
      key: '9',
      Sr: 'ORD126',
      role: 'CUST004',
      customerName: 'Alice Brown',
      edit: 'test@gmail.com',
      viewAccess: '101 Elm St, Hamlet',
      totalOrders: '2022-04-20',
      totalAmount: 'Ready for Delivery',
      orderDate: 1200,
    },
    {
      key: '10',
      Sr: 'ORD127',
      role: 'CUST005',
      customerName: 'Charlie Wilson',
      edit: 'edit B',
      viewAccess: '202 Maple St, Suburb',
      totalOrders: '2022-05-05',
      totalAmount: 'On Site',
      orderDate: 900,
    },
    {
      key: '11',
      Sr: 'ORD123',
      role: 'CUST001',
      customerName: 'John Doe',
      edit: 'test@gmail.com',
      viewAccess: '45432-453',
      totalOrders: '24',
      totalAmount: '346$',
      orderDate: '2022-02-28',
    },
    {
      key: '12',
      Sr: 'ORD124',
      role: 'CUST002',
      customerName: 'Jane Smith',
      edit: 'edit B',
      viewAccess: '456 Oak St, Town',
      totalOrders: '2022-03-15',
      totalAmount: 'Condition Pending',
      orderDate: 750,
    },
    {
      key: '13',
      Sr: 'ORD125',
      role: 'CUST003',
      customerName: 'Bob Johnson',
      edit: 'edit C',
      viewAccess: '789 Pine St, Village',
      totalOrders: '2022-04-01',
      totalAmount: 'In Production',
      orderDate: 1000,
    },
    {
      key: '14',
      Sr: 'ORD126',
      role: 'CUST004',
      customerName: 'Alice Brown',
      edit: 'test@gmail.com',
      viewAccess: '101 Elm St, Hamlet',
      totalOrders: '2022-04-20',
      totalAmount: 'Ready for Delivery',
      orderDate: 1200,
    },
    {
      key: '15',
      Sr: 'ORD127',
      role: 'CUST005',
      customerName: 'Charlie Wilson',
      edit: 'edit B',
      viewAccess: '202 Maple St, Suburb',
      totalOrders: '2022-05-05',
      totalAmount: 'On Site',
      orderDate: 900,
    },
    // Add more dummy data as needed
  ];
    
  return (
    <div className='' >
<div className="bg-white w-100">
<div className="container-fluid">

         <div className="mx-0 pt-3 pb-2 row mb-3 w-100 justify-content-between  " style={{top:-6,position:'relative'}}>
          <div className="col-md-4 pl-0">
          <Input
          className='radius-large'
        placeholder="Search"
        // onSearch={onSearch}
        size='large'
        suffix ={<SearchOutlined />}
      />
          </div>
 
 
    
    <div className="col-md-7 px-0  text-right">

          <Button  onClick={()=>openAddCustomerModal()} size='large' className='radius-large  mt-lg-0 mt-md-0 mt-3' type='primary'>
            <AddCircleOutlineIcon className='mr-2'/>
            Create New Role</Button>
    </div>
    
        </div>
</div>
</div>
<div className="px-3">

        <Table
      scroll={{ x: scrollX }}
      columns={columns}
      dataSource={data}
      pagination={false}
      
    />
      </div>
     
      <CreateRoleModal
      visible={isAddCustomerModalVisible}
      onCancel={closeAddCustomerModal}
      />
      <DeleteModal
      onDelete={()=>console.log('')}

       visible={deleteModalVisible}
       onCancel={closeDeleteModal}
      />
   
    </div>
  );
};

export default ManageRolePage;
