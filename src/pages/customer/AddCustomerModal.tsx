import React, { useEffect, useState } from 'react';
import { Modal, Button, Radio, Input, Form, notification } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { fetchCustomers } from '@/stores/customersReducer';
// import { fetchCustomers } from '@/customersReducer';
const { Item, useForm } = Form;

type AddCustomerModalProps = {
  visible: boolean;
  onCancel: () => void;
  editedCustomerData:any;
};

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ visible, onCancel,editedCustomerData }) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const [customerType, setCustomerType] = useState('private'); // Default to 'private' type
  const dispatch =useDispatch()
  const handleTypeChange = (e: any) => {
    setCustomerType(e.target.value);
  };
  const addCustomerToFirebase = async (values: any) => {
    if (editedCustomerData) {
      try {
        setIsLoading(true)
        const firestore = firebase.firestore();
  
        // Update the existing customer in Firebase
        await firestore.collection('customers').doc(editedCustomerData.uid).update(values);
  
        notification.success({ message: 'Customer updated successfully' });
        form.resetFields();
        onCancel();
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)

        console.error('Error updating customer:', error);
        notification.error({ message: 'Error updating customer' });
      }
    }else{

      try {
        setIsLoading(true)

        const firestore = firebase.firestore();
        values.customer_type = customerType;
    
        let uid = '';
        
          const privateCustomersCollection = firestore.collection('customers');
          const privateCustomerDocRef = await privateCustomersCollection.add(values);
          uid = privateCustomerDocRef.id;
         await firestore.collection('customers').doc(uid).update({
              uid,
            });
        notification.success({ message: 'Customer added successfully' });
        form.resetFields()
        onCancel();
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)

        console.error('Error adding customer:', error);
        notification.error({ message: 'Error adding customer' });
      }
    }
await dispatch(fetchCustomers({search:null,date:null,customerEmail:null}));

  };
  useEffect(() => {
    if (editedCustomerData) {
      setCustomerType(editedCustomerData.customer_type);
      form.setFieldsValue(editedCustomerData);
    }else{
      form.resetFields()
    }
  }, [editedCustomerData]);
  const renderPrivateFields = () => (
    <Form layout='vertical' form={form}
    onFinish={addCustomerToFirebase}
    >
      <div className="row">
        <div className="col-md-6 px-2">
          <Item  rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="name" label="First Name">
            <Input className='radius-large primaryInput' placeholder="First Name" />
          </Item>
        </div>
        <div className="col-md-6 px-2">
          <Item  rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="last_name" label="Last Name">
            <Input className='radius-large primaryInput' placeholder="Last Name" />
          </Item>
        </div>
      </div>
      <Item  rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="email" label="Email Address">
        <Input className='radius-large primaryInput' placeholder="Email Address" />
      </Item>
      <Item  rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="phone" label="Phone Number">
        <Input className='radius-large primaryInput' placeholder="Phone Number" />
      </Item>
    </Form>
  );

  const renderCompanyFields = () => (
    <Form layout='vertical' form={form}
    onFinish={addCustomerToFirebase}>
    
      <Item  rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="name" label="Company Name">
        <Input className='radius-large primaryInput' placeholder="Company Name" />
      </Item>
      <Item  rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="email" label="Email Address">
        <Input className='radius-large primaryInput' placeholder="Email Address" />
      </Item>
      <Item  rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="phone" label="Phone Number">
        <Input className='radius-large primaryInput' placeholder="Phone Number" />
      </Item>
    </Form>
  );

  return (
    <Modal
      closable={false}
      className='custom-modal'
      title={
        <div className='d-flex fs-3 align-items-center justify-content-center '>
          <p className='mb-0 font-weight-bold '> {editedCustomerData?'Update':'Add New'} Customer</p>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div className="row mb-3 mx-2 mt-4">
        <Radio.Group value={customerType} onChange={handleTypeChange}>
          <Radio.Button className='px-4' value="private">Private</Radio.Button>
          <Radio.Button className='px-4' value="company">Company</Radio.Button>
        </Radio.Group>
      </div>

      {customerType === 'private' ? renderPrivateFields() : renderCompanyFields()}

      <div className="row mt-3">
        <div className="col-6 px-1">
          <Button size="large" className='w-100' type='ghost' onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <div className="col-6 px-1">
          <Button loading={isLoading} size="large" className='w-100' type="primary" onClick={() => form.submit()}>
            {editedCustomerData?'Update':'Add '}  Customer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCustomerModal;
