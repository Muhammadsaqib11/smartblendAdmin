import { FC, useEffect, useState } from 'react';

import { Button, Input, message, notification, Select, Table, Tooltip, Typography } from 'antd';
import { SearchOutlined, FilterFilled, PlusCircleOutlined } from '@ant-design/icons';
import { LocaleFormatter } from '@/locales';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AddCustomerModal from './AddCustomerModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import InsertLinkIcon from '@mui/icons-material/InsertLink';
import DoneIcon from '@mui/icons-material/Done';
import DeleteModal from '@/components/Modal/DeleteModal';
import { fetchCustomers } from '@/stores/customersReducer';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
const { Title, Paragraph } = Typography;

const { Search } = Input;

const CustomersPage = () => {
  const [isAddCustomerModalVisible, setAddCustomerModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [editedCustomerData, setEditedCustomerData] = useState(null);
  const [deleteId, setDeleteId] = useState('');
  const [customersOption, setCustomersOption] = useState([]);

  const [filter, setFilter] = useState({
    search: '',
    date: null,
    customerEmail: '',
  });
  const dispatch = useDispatch();
  const { customers, loading } = useSelector(state => state.customers);
  const onSearch = value => {
    setFilter({ ...filter, search: value });
  };

  const onCustomerEmailChange = value => {
    setFilter({ ...filter, customerEmail: value });
  };

  const onDateChange = date => {
    setFilter({ ...filter, date });
  };
  const handleClick = index => {
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
  const handleEditClick = customerData => {
    setEditedCustomerData(customerData);
    openAddCustomerModal();
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
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'uid',
      key: 'uid',
      render: uid => (uid ? `${uid.slice(-4)}` : ''),
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'customer_type',
      key: 'customer_type',
      render: customer_type => <span className="text-capitalize">{customer_type}</span>,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone#',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Total Orders',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
      render: totalOrders => (totalOrders !== undefined ? totalOrders : 0),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: totalAmount => (totalAmount !== undefined ? totalAmount : 0),
    },
    {
      title: 'Last Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: totalAmount => (totalAmount !== undefined ? totalAmount : 'N/A'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <span className="d-flex">
          <Button className="p-2" style={{ background: '#ECECEC' }} onClick={() => handleEditClick(record)}>
            <EditIcon fontSize="small" />
          </Button>
          <Button
            onClick={() => {
              setDeleteId(record.uid);
              openDeleteModal();
            }}
            className="p-2"
            style={{ background: '#ECECEC', marginLeft: '8px' }}
          >
            <DeleteIcon fontSize="small" style={{ color: '#FF0000' }} />
          </Button>
          <Button
            className="p-2"
            style={{
              background: selectedRowIndex === index ? '#4CAF50' : '#ECECEC',
              marginLeft: '8px',
              color: selectedRowIndex === index ? '#FFFFFF' : 'inherit',
            }}
            onClick={() => handleClick(index)}
            disabled={selectedRowIndex !== null && selectedRowIndex !== index}
          >
            {selectedRowIndex === index ? <DoneIcon fontSize="small" /> : <InsertLinkIcon fontSize="small" />}
          </Button>
        </span>
      ),
    },
  ];
  const onDelete = async () => {
    try {
      const firestore = firebase.firestore();

      // Assuming your collection is called 'customers'
      await firestore.collection('customers').doc(deleteId).delete();
      notification.success({ message: '`Customer with ID ${deleteId} deleted successfully`' });
      // Add any additional logic or notifications for successful deletion
      console.log(`Customer deleted successfully`);
      closeDeleteModal();
      await dispatch(fetchCustomers());
    } catch (error) {
      // Handle errors during deletion
      console.error('Error deleting customer:', error);
    }
  };

  useEffect(() => {
    dispatch(fetchCustomers(filter));
  }, [filter]);
  useEffect(() => {
    setCustomersOption(customers);
  }, []);
  return (
    <div className="bg-white">
      <div className="bg-white w-100">
        <div className="container-fluid">
          <div className=" pt-3 pb-2 row mb-3 w-100 mx-0" style={{ top: -6, position: 'relative' }}>
            <div className="col-lg-3 col-sm-6 col-12 mb-2 pl-0">
              <Input
                className="radius-large"
                placeholder="Search"
                // onSearch={onSearch}
                value={filter.search}
                size="large"
                suffix={<SearchOutlined />}
                onChange={e => onSearch(e.target.value)}
              />
            </div>
            <div className="col-lg-3  col-6 mb-2 pl-0">
              <Select
                allowClear
                // value={filter.customerEmail}
                onChange={value => onCustomerEmailChange(value)}
                size="large"
                className="w-100 radius-large"
                placeholder="Customer email"
              >
                {customersOption?.map((el, ind) => (
                  <Select.Option key={ind} value={el.email}>
                    {el.email}
                  </Select.Option>
                ))}
              </Select>
              {/* <Select
  allowClear
  placeholder="Customer email"
  value={filter.customerEmail}
  onChange={(value) => onCustomerEmailChange(value)}
  listItemHeight={33}
  size="large"
  className="w-100 radius-large"
>
  {customersOption?.map((el, ind) => (
    <Select.Option key={ind} value={el.email}>
      {el.email}
    </Select.Option>
  ))}
</Select> */}
            </div>

            <div className="col-lg-3 col-6 mb-2 pl-0 ">
              <DatePicker
                selected={startDate}
                onChange={date => onDateChange(date)}
                placeholderText="Select date"
                className="radius-large w-100 px-2"
              />
            </div>

            <div className="col-lg-3 col-12 pl-0  pr-lg-0 p-md-0  d-flex justify-content-between align-items-center">
                <div
                  className="notice "
                  id="notice-center"

                  //  onClick={()=>setLogoutModalVisible(true)}
                >
                  <FilterFilled />
                  {/* <BellFilled style={{width:15}} /> */}
                </div>
              

              <Button
                onClick={() => {
                  setEditedCustomerData(null);
                  openAddCustomerModal();
                }}
                size="large"
                className="radius-large "
                type="primary"
              >
                <PlusCircleOutlined style={{ top: -3, position: 'relative' }} />
                Add Customer
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-3">
        <Table loading={loading} scroll={{ x: scrollX }} columns={columns} dataSource={customers} />
      </div>

      <AddCustomerModal
        editedCustomerData={editedCustomerData}
        visible={isAddCustomerModalVisible}
        onCancel={closeAddCustomerModal}
      />
      <DeleteModal visible={deleteModalVisible} onCancel={closeDeleteModal} onDelete={onDelete} />
    </div>
  );
};

export default CustomersPage;
