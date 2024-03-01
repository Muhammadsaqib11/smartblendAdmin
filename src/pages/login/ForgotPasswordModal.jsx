import './index.less';

import { Button, Checkbox, Form, Input, Modal, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';

import { loginAsync } from '../../stores/user.action';
import whiteLogo from '../../assets/logo/whiteLogo.png';
import firebase from 'firebase';
const ForgotPasswordModal = ({ visible, onCancel }) => {
  const { formatMessage } = useLocale();

  
  
  const onFinish = async values => {
    try {
      const res=await firebase.auth().sendPasswordResetEmail(values.email)
      console.log(res)
      notification.success({message:'Password reset email sent. Please check your email inbox.'});
      // onCancel(); // Close the modal after sending the reset email
    } catch (error) {
      console.error('Error sending password reset email:', error);
      message.error('Failed to send password reset email. Please try again.');
    }
  };
  return (
    <Modal
      // closeIcon={}
      closable={false}
      visible={visible}
      title={<p className="text-center font-weight-bold fs-4">Reset Password</p>}
      onCancel={onCancel}
      footer={null}
    >
      <p className="text-center font-weight-medium">
        Enter your email address, we will send you a password reset link.
      </p>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
          ]}
        >
          <Input className="radius-large primaryInput" placeholder="Enter your email" />
        </Form.Item>
        <div className="row">
          <div className="col-md-6">
            {/* <Form.Item> */}
            <Button
              size="large"
              type="ghost"
              className="w-100 btn-padding font-weight-bold "
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            {/* </Form.Item> */}
          </div>
          <div className="col-md-6">
            <Button size="large" type="primary" htmlType="submit" className="w-100 btn-padding font-weight-bold ">
              Send Reset Link
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
export default ForgotPasswordModal;
