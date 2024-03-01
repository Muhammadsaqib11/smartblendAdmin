import React, { useState } from 'react';
import { Modal, Button, Radio, Input, Form } from 'antd';
import EditIcon from '@mui/icons-material/Edit';

const { Item, useForm } = Form;

type DeleteModalProps = {
  visible: boolean;
  onCancel: () => void;
  onDelete: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onCancel,onDelete }) => {
  const [form] = useForm();
  const [customerType, setCustomerType] = useState('private'); // Default to 'private' type

  const handleTypeChange = (e: any) => {
    setCustomerType(e.target.value);
  };

  const renderPrivateFields = () => (
    <Form layout='vertical' form={form}>
      <div className="row">
        <div className="col-md-6 px-2">
          <Item className="mb-2" name="firstName" label="First Name">
            <Input className='radius-large primaryInput' placeholder="First Name" />
          </Item>
        </div>
        <div className="col-md-6 px-2">
          <Item className="mb-2" name="lastName" label="Last Name">
            <Input className='radius-large primaryInput' placeholder="Last Name" />
          </Item>
        </div>
      </div>
      <Item className="mb-2" name="email" label="Email Address">
        <Input className='radius-large primaryInput' placeholder="Email Address" />
      </Item>
      <Item className="mb-2" name="phoneNumber" label="Phone Number">
        <Input className='radius-large primaryInput' placeholder="Phone Number" />
      </Item>
    </Form>
  );

  const renderCompanyFields = () => (
    <Form layout='vertical' form={form}>
      <Item className="mb-2" name="companyName" label="Company Name">
        <Input className='radius-large primaryInput' placeholder="Company Name" />
      </Item>
      <Item className="mb-2" name="companyEmail" label="Email Address">
        <Input className='radius-large primaryInput' placeholder="Email Address" />
      </Item>
      <Item className="mb-2" name="companyPhoneNumber" label="Phone Number">
        <Input className='radius-large primaryInput' placeholder="Phone Number" />
      </Item>
    </Form>
  );

  return (
    <Modal
      closable={false}
      centered={true}
      className='custom-modal'
      width={300}
      title={
        <div className='d-flex fs-3 align-items-center justify-content-center '>
          <p className='mb-0 font-weight-bold '>Are you sure?</p>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
    <div className="row mt-3">
        <div className="col-md-6 px-2">
          <Button size="large" className='w-100' type='ghost' onClick={onCancel}>
            Cancel
          </Button>
        </div>
        <div className="col-md-6 px-2">
          <Button size="large" className='w-100 btn-danger '   onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
 
 
    </Modal>
  );
};

export default DeleteModal;
