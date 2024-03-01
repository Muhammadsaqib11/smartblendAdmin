import { FC, useEffect, useState } from 'react';

import MySearch from '@/components/business/search';
import MyFormItem from '@/components/core/form-item';
import { useLocale } from '@/locales';
import { Button, Form, Input, notification, Select } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { fetchUserProfile } from '@/stores/user.action';
import { useNavigate } from 'react-router-dom';

const { Item, useForm } = Form;

const Settings: FC = () => {
  const { formatMessage } = useLocale();
  const {userProfile } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const dispatch =useDispatch()
  const navigate =useNavigate()
 
  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const firestore = firebase.firestore();
      const user = firebase.auth().currentUser;

      // Validate if new password and confirm password match
      if (values.Npassword !== values.cNpassword) {
        notification.error({ message: 'New Password and Confirm New Password must match.' });
        return;
      }

      // Reauthenticate the user with their current password
      const credential = firebase.auth.EmailAuthProvider.credential(
        user?.email || '',
        values.CurrentPassword
      );
      await user?.reauthenticateWithCredential(credential);

      // Update Firebase user profile
      if (user) {
        // Update name
        if (values.name) {
          const userRef = firestore.collection('users').doc(user?.uid);
          await userRef.update({
            name: values.name,
          });
        }

        // Update password
        if (values.Npassword) {
          await user.updatePassword(values.Npassword);
        }
      }

      // Update Firestore user collection
      const userRef = firestore.collection('users').doc(user?.uid);
      await userRef.update({
        name: values.name || userProfile.name,
        email: values.email || userProfile.email,
      });

      notification.success({ message: 'User updated successfully' });
    dispatch(fetchUserProfile(localStorage.getItem('t')));
      
      console.log('User updated successfully!');
    } catch (error:any) {
      console.error('Error updating user:', error);
      const err= JSON.parse(error.message)
    const errorMessage = err.error.message.replace(/_/g, ' ').toLowerCase();
    const capitalizedMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

    notification.error({ message: capitalizedMessage });
      // notification.error({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
form.setFieldsValue(userProfile)
},[])
  return (
    <div className='p-3' style={{background:"#fff"}}>
      <Form layout='vertical' form={form} onFinish={onFinish}>
        <div className="row">
          <div className="col-md-6">
            <Item
               rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="name" label="Full Name">
              <Input className='radius-large primaryInput' placeholder="Full Name" />
            </Item>
          </div>
          <div className="col-md-6">
            <Item
               rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]} className="mb-2" name="CurrentPassword" label="Current Password">
              <Input.Password
                className='radius-large primaryInput'
                placeholder="Current Password"
                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              />
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Item
               rules={[
                {
                  required: true,
                  message: 'This field is required!',
                },
              ]}
           
            className="mb-2" name="email" label="Email Address">
              <Input readOnly  type="email" className='radius-large primaryInput' placeholder="Email" />
            </Item>
          </div>
          <div className="col-md-6">
            <Item
            className="mb-2" name="Npassword" label="New Password">
              <Input.Password
                className='radius-large primaryInput'
                placeholder="New Password"
                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              />
            </Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Item
             className="mb-2" name="cNpassword" label="Confirm New Password">
              <Input.Password
                className='radius-large primaryInput'
                placeholder="Confirm New Password"
                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              />
            </Item>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-4">

        <Button size="large" className='px-3' type='ghost'
        onClick={()=>navigate(-1)}
        >
         <CloseIcon className='mr-2'/>   Cancel
          </Button>
          <Button
                      loading={loading}

          size="large" className='px-3 btn-padding'  type="primary" htmlType='submit'  >
          <SaveIcon className='mr-2'/> Save Changes
          </Button>
        </div>
        
      </Form>
    </div>
  );
};

export default Settings;
