import { FC, useEffect, useRef, useState } from 'react';

import { Button,  Input, Modal, notification, Select, Table,  Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { SearchOutlined ,FilterFilled,PlusCircleOutlined} from '@ant-design/icons';
import { LocaleFormatter } from '@/locales';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
// import AddCustomerModal from './AddCustomerModal';
// import InsertLinkIcon from '@mui/icons-material/InsertLink';
import DoneIcon from '@mui/icons-material/Done';
import DeleteModal from '@/components/Modal/DeleteModal';
import TuneIcon from '@mui/icons-material/Tune';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCustomerModal from '../customer/AddCustomerModal';
import AddUserModal from './AddUserModal';
import LockIcon from '@mui/icons-material/Lock';
import UserPasswrdModal from '@/components/Modal/UserPasswrdModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '@/stores/usersReducer';
import { fetchCustomers } from '@/stores/customersReducer';
import { UserListAsync } from '@/stores/user.action';
// import firebase from 'firebase';
// import 'firebase/auth';
const { Title, Paragraph } = Typography;


const div = <div style={{ height: 200 }}>2333</div>;
const { Search } = Input;
type DataType = {
  key: string;
  uid: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  totalOrders: string;
  totalAmount: string;
  orderDate: string | number; // Updated type for orderDate
};
const UserPage: FC = () => {
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("t")
  const [isAddCustomerModalVisible, setAddCustomerModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userDetailModal, setUserDetailModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedCustomerData, setEditedCustomerData] = useState(null);
  const [deleteId, setDeleteId] = useState('');
  
  const [lockModalVisible, setLockModalVisible] = useState(false); 
const navigate=useNavigate()
const dispatch=useDispatch()
  const [isInstalled, setIsInstalled] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [userList, setUserList] = useState(null);
  const user = useSelector(state => console.log("state", state));
  const openLockModal = () => {
    setLockModalVisible(true);
  };


  const closeLockModal = () => {
    setLockModalVisible(false);
  };
  const handleClick = (index:any) => {
    // Toggle the selected row index
    setSelectedRowIndex(selectedRowIndex === index ? null : index);
    setTimeout(() => {
      setIsInstalled(false);
      setSelectedRowIndex(null);
    }, 4000);
  };
  // const [startDate, setStartDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
        const token = localStorage.getItem('t'); // Assuming the token is stored in localStorage
        const response = await fetch("https://smart-blend-930254fd4077.herokuapp.com/admin/users-all", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        const result = await response.json(); // Parse response body as JSON
        setUserList(result.data)
        setLoading(false);
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if necessary
    }
};


  useEffect(() => {
    // dispatch(UserListAsync())
    fetchData()
    },[])
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
  
  const onSearch = (value:any) => {
    console.log(value); // Handle search functionality here
  }
  const handleEditClick = customerData => {
    console.log("customerData", customerData);
    setUserDetailModal(true)
    setEditedCustomerData(customerData);
    openAddCustomerModal();
  };

  const handleFileChange = async (event) => {
    setLoading(true)
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'text/csv') {
        try {
          const token = localStorage.getItem('t'); // Assuming the token is stored in localStorage
          if (!token) {
            throw new Error('Authentication token not found.');
          }
  
          const formData = new FormData();
          formData.append('file', file);
  
          const response = await fetch("https://smart-blend-930254fd4077.herokuapp.com/file/create", {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });
          const result = await response.json();
  
          if (response.ok) {
            // File uploaded successfully
            console.log('File uploaded successfully:' , result);
            const bloodresponse = await fetch("https://smart-blend-930254fd4077.herokuapp.com/user/blood-sample", {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json' // Specify content type as JSON
              },
              body: JSON.stringify({ filename: result.file }) // Stringify the object
          });

          const bloodReportresult = await bloodresponse.json();
          if (bloodresponse.ok) {
            setLoading(false)
    notification.success({ message: 'File Upload Successfully!' });


          }
          console.log("bloodReportresult", bloodReportresult)

          } else {
            // Handle error response
            throw new Error('Failed to upload file.');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          // Show error message or handle error as needed
        }
      } else {
    notification.error({ message: 'Please select a CSV file.!' });

 
      }
    }
  };

  const handleClickbutton = () => {
    // Reset the value of the file input to allow selecting the same file again
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };
  
 
  // const onDelete = async (deleteId:any) => {
  //   try {
  //     const auth = firebase.auth();
  //     const firestore = firebase.firestore();
  
  //     // Get the user from Firebase Authentication
  //     // const user = await auth.getUser(deleteId);
  
  //     // Delete the user from Firebase Authentication
  //     // await auth.deleteUser(deleteId);
  
  //     // Delete the corresponding document from Firestore
  //     await firestore.collection('users').doc(deleteId).delete();
  
  //     notification.success({ message: `User with ID ${deleteId} deleted successfully` });
  //     closeDeleteModal();
  //     // await dispatch(fetchUsers());
  //   dispatch(fetchUsers({ search: '', date: '', customerEmail: '' }))

  //   } catch (error) {
  //     // Handle errors during deletion
  //     console.error('Error deleting user:', error);
  //   }
  // };


  const columns: ColumnsType<any> = [
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
    },
    {
      title: 'Gender',
      dataIndex: ['profile', 'gender'], // Access nested property using array notation
      key: 'gender',
      align: 'center',
    },
    {
      title: 'Height',
      dataIndex: ['profile', 'height'], // Access nested property using array notation
      key: 'height',
      align: 'center',
    },
    {
      title: 'Weight',
      dataIndex: ['profile', 'weight'], // Access nested property using array notation
      key: 'weight',
      align: 'center',
    },

      {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (text:any, record:any, index:any) => (
              <span className='d-flex justify-content-center '>
                <Button className=''
                onClick={() => handleEditClick(record)}
                style={{ background: '#ECECEC' }}>
                  <RemoveRedEyeIcon />
                </Button>
             
              </span>
            ),
          },
   
  ];
  
//   const columns: ColumnsType<DataType> = [
//     {
//       title: 'User ID',
//       dataIndex: 'uid',
//       key: 'uid',
//       align: 'center',
//       render: uid => (uid ? `${uid.slice(-4)}` : ''),

//     },
//     {
//       title: 'Full Name',
//       dataIndex: 'name',
//       key: 'name',
//       align: 'center',
//     },
 
    
//     {
//       title: 'Email Address',
//       dataIndex: 'email',
//       key: 'email',
//       align: 'center',
//     },
//     {
//       title: 'User Role',
//       dataIndex: 'role',
//       key: 'role',
//       align: 'center',
//     },
 
//     {
//       title: 'Last Login Date',
//       dataIndex: 'lastLoginDate',  
//       key: 'lastLoginDate',
//       align: 'center',
    

//     },
//     {
//       title: 'Action',
//       key: 'action',
//       align: 'center',
//       render: (text:any, record:any, index:any) => (
//         <span className='d-flex justify-content-center '>
//           <Button className=''
//           onClick={() => handleEditClick(record)}
//           style={{ background: '#ECECEC' }}>
//             <EditIcon />
//           </Button>
//           <Button onClick={() => {
//               setDeleteId(record.uid);
//               openDeleteModal();
//             }} className='' style={{ background: '#ECECEC', marginLeft: '8px' }}>
//             <DeleteIcon style={{ color: '#FF0000' }} />
//           </Button>
//           <Button
//             className=''
//             style={{
//               background: selectedRowIndex === index ? '#4CAF50' : '#ECECEC',
//               marginLeft: '8px',
//               color: selectedRowIndex === index ? '#FFFFFF' : 'inherit',
//             }}
//             onClick={() => openLockModal()} 
//             // onClick={() => handleClick(index)}
//             >

// <LockIcon/>
//           </Button>
//         </span>
//       ),
//     },
//   ];

  
  console.log("editedCustomerData:", editedCustomerData); // Log the parsed response

  return (
    <div className=' bg-white' >
<div className="bg-white w-100">
<div className="container-fluid">

         <div className="row  mt-3 mb-2" style={{top:-6,position:'relative'}}>
          <div className="col-lg-3 col-12  mb-3 ">
          {/* <Input
          className='radius-large'
        placeholder="Search"
        // onSearch={onSearch}
        size='large'
        suffix ={<SearchOutlined />}
      /> */}
          </div>
       <div className="col-lg-2 col-6 pr-1 mb-3 ">
       {/* <Select  listItemHeight={33} size='large' className='w-100 radius-large' placeholder="User Role">
            <Select.Option value="This week">
            This week
            </Select.Option>
            
          </Select> */}
       </div>
       
       
      
      <div className="col-lg-2 col-6 mb-3 pl-1">
      {/* <DatePicker placeholderText='Select date' selected={startDate} onChange={(date) => setStartDate(date)}   className='radius-large w-100 px-2' /> */}

      </div>
    
        <div className="col-lg-5 col-12 mb-3   d-flex justify-content-end align-items-center align-content-end flex-wrap ">
          <div className="row mx-0">
            <div className="col-md-7 col-12 d-flex">
            <div className='mr-4'>
          {/* <span className="notice mr-3" id="notice-center"
                 
                  >
           <FilterFilled />
                </span> */}
          </div>
            {/* <Button  onClick={()=>navigate('manage-role')} size='large' className='radius-large w-100 ' type='primary'
            
            >
            <TuneIcon className='mr-2'  />
            Manage Roles</Button> */}
            </div>
            <div className="col-md-10">
            <Button size='large' 
            className='radius-large w-100 mt-3'
             type='primary'
             onClick={handleClickbutton}
              disabled={loading}
              >
        <AddCircleOutlineIcon className='mr-2'/>
        Add Report
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
            </div>


          </div>
       
          
            
        </div>
        </div>
</div>
</div>
<div className="px-3">

        <Table
      scroll={{ x: scrollX }}
      columns={columns}
      dataSource={userList}
      loading={loading}
      
    />
      </div>
     
     {/* <AddUserModal
        editedCustomerData={editedCustomerData}

      visible={isAddCustomerModalVisible}
      onCancel={closeAddCustomerModal}
      /> */}
     

     <Modal
        // title=""
        centered
        visible={userDetailModal}
        onCancel={() => setUserDetailModal(false)}
        closable={false}
        title={<p className='text-center font-weight-bold fs-4'>User Detail</p>}
        footer={null}
        width={300}
      >

        <div className="d-flex mt-2 ">

        <span className='font-weight-medium w-100'
          >
          userName
        </span>
        <span className='font-weight-medium w-100'
          >
          {editedCustomerData?.full_name}
        </span>
        

        </div>
        <div className="d-flex mt-2 ">

<span className='font-weight-medium w-100'
  >
  Email
</span>
<span className='font-weight-medium w-100'
  >
    {editedCustomerData?.email}
</span>


</div>
        <div className="d-flex mt-2 ">

<span className='font-weight-medium w-100'
  >
  Phone
</span>
<span className='font-weight-medium w-100'
  >
    {editedCustomerData?.phone_number}
</span>


</div>
        <div className="d-flex mt-3 gap-4">

         <Button size='large' type='ghost' className='font-weight-medium w-100'
           onClick={() => setUserDetailModal(false)}>
            close
          </Button>
        
        </div>
      </Modal>
 
 
    </div>
  );
};

export default UserPage;
