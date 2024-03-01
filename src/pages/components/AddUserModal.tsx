import React, { useEffect, useState } from 'react';
import { Modal, Button, Radio, Input, Form, Select, notification } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import {  createUserAndSaveToFirestore } from '@/firebase/utils';
import { EyeOutlined, EyeInvisibleOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import firebase from 'firebase';
const { Item, useForm } = Form;

type AddUserModalProps = {
  visible: boolean;
  onCancel: () => void;
  editedCustomerData:any;

};

const AddUserModal: React.FC<AddUserModalProps> = ({ visible, onCancel,editedCustomerData }) => {
  const [form] = useForm();
  const [loading, setIsLoading] = useState(false); // Default to 'private' type
  const updatePasswordForUser = async (userId, newPassword) => {
    try {
      const userRef = firebase.firestore().collection('users').doc(userId);
  
      
  
      // Get the user from Firebase Authentication
      // const user = await firebase.auth().getUser(userId);
  
      // Update the password for the user
      // await user.updatePassword(newPassword);
  
      notification.success({ message: 'User password updated successfully!' });
    } catch (error) {
      console.error('Failed to update user password:', error);
      throw error;
    }
  };

  const onFinish =async (values: any) => {
    const { password, ...newValues } = values;

    if (editedCustomerData) {
      try {
        setIsLoading(true);
        // Update the password for the specific user
        // await updatePasswordForUser(editedCustomerData.uid, password);

        // Update other user information in Firestore if needed
        const userRef = firebase.firestore().collection('users').doc(editedCustomerData.uid);
        await userRef.update(newValues);

        notification.success({ message: 'User updated successfully!' });
        onCancel();
        form.resetFields();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to update user:', error);
        setIsLoading(false);
        notification.error({ message: error.message });
      }}
      else{

      try {
        setIsLoading(true);
        values.lastSignInTime='N/A'
  
        
        const uid =  await createUserAndSaveToFirestore(values.email,password, newValues);
        
        console.log('Customer added successfully with UID:', uid);
        if(uid){
          notification.success({ message:'Customer added successfully!'})
          onCancel();
          form.resetFields()
        setIsLoading(false);
  
        }
      } catch (error) {
        console.error('Failed to add customer:', error);
  
        setIsLoading(false);
  
        notification.error({ message:error.message})
  
      }
    }
   
  };
  useEffect(() => {
    if (editedCustomerData) {
      form.setFieldsValue(editedCustomerData);
    }else{
      form.resetFields()
    }
  }, [editedCustomerData]);
  return (
    <Modal
      closable={false}
      className='custom-modal'
      title={
        <div className='d-flex fs-3 align-items-center justify-content-center '>
          <p className='mb-0 font-weight-bold '>          <p className='mb-0 font-weight-bold '> {editedCustomerData?'Update':'Add New'} User</p>
</p>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
   
   <Form layout='vertical' form={form} onFinish={onFinish}>
        <Item className="mb-2" name="name" label="Full Name" rules={[{ required: true, message: 'Please enter the full name' }]}>
          <Input className='radius-large primaryInput' placeholder="Full Name" />
        </Item>
        <Item className="mb-2" name="role" label="User Role" rules={[{ required: true, message: 'Please select the user role' }]}>
          <Select size='large' className='w-100' placeholder="Select User Role">
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="sales manager">Sales Manager</Select.Option>
            <Select.Option value="installer">Installer</Select.Option>
            <Select.Option value="customer">Customer</Select.Option>
          </Select>
        </Item>
        <Item className="mb-2" name="email" label="Email Address" rules={[{ required: true, message: 'Please enter the email address' }]}>
          <Input className='radius-large primaryInput' placeholder="Email Address" />
        </Item>
        {!editedCustomerData&&
        <Item className="mb-2" name="password" label="Password" rules={[{ required: true, message: 'Please enter the password' }]}>
          <Input.Password
             iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          type="password" className='radius-large primaryInput' placeholder="Password" />
        </Item>
        }
   
        <div className="row mt-3">
          <div className="col-6 px-1">
            <Button size="large" className='w-100' type='ghost' onClick={onCancel}>
              Cancel
            </Button>
          </div>
          <div className="col-6 px-1">
            <Button loading={loading} size="large" className='w-100' type="primary" htmlType="submit">
              
          <p className='mb-0 font-weight-bold '> {editedCustomerData?'Update':'Add'} User</p>

            </Button>
          </div>
        </div>
      </Form>

    </Modal>
  );
};

export default AddUserModal;
