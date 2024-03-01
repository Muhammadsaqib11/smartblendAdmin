import React, { useState } from 'react';
import { Modal, Button, Radio, Input, Form } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import { useLocale } from '@/locales';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
const { Item, useForm } = Form;

type UserPasswrdModalProps = {
  visible: boolean;
  onCancel: () => void;
};

const UserPasswrdModal: React.FC<UserPasswrdModalProps> = ({ visible, onCancel }) => {
  const [form] = useForm();
  const { formatMessage } = useLocale();

  const [customerType, setCustomerType] = useState('private'); // Default to 'private' type

  const handleTypeChange = (e: any) => {
    setCustomerType(e.target.value);
  };



  return (
    <Modal
      closable={false}
      centered={true}
      className='custom-modal'
      // width={300}
      title={
        <div className='d-flex fs-3 align-items-center justify-content-center '>
          <p className='mb-0 font-weight-bold '>User Password?</p>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
        <Form layout="vertical"  className="login-page-form px-3">

        <Form.Item
        className='mt-3'
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: 'gloabal.tips.enterPasswordMessage',
                    }),
                  },
                ]}
              >

         <Input.Password
                  className="radius-large primaryInput"
                  placeholder={formatMessage({
                    id: 'gloabal.tips.password',
                  })}
                  iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>
    <div className="row mt-3">
        <div className="col-md-6 px-2">
          <Button size="large" className='w-100' type='ghost' onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <div className="col-md-6 px-2">
          <Button size="large" className='w-100' type="primary"   onClick={onCancel}>
            Update
          </Button>
        </div>
      </div>
        </Form>
 
 
    </Modal>
  );
};

export default UserPasswrdModal;
