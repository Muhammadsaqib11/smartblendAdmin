  import React, { useState } from 'react';
  import { Modal, Button, Checkbox, Radio, Input, Form, Collapse } from 'antd';
  import EditIcon from '@mui/icons-material/Edit';
  import ArrowRightIcon from '@mui/icons-material/ArrowRight';
  const { Panel } = Collapse;

  const { Item, useForm } = Form;

  type CreateRoleModalProps = {
    visible: boolean;
    onCancel: () => void;
  };

  const CreateRoleModal: React.FC<CreateRoleModalProps> = ({ visible, onCancel }) => {
    const [form] = useForm();
    const [selectedModules, setSelectedModules] = useState<string[]>([]);

    const modules = [
      { id: '1', title: 'Module 1', subModules: ['SubModule 1.1', 'SubModule 1.2'] },
      { id: '2', title: 'Module 2', subModules: ['SubModule 2.1', 'SubModule 2.2'] },
      { id: '3', title: 'Module 3', subModules: ['SubModule 3.1', 'SubModule 3.2'] },
    ];
    
  
 
    const handleModuleSelection = (moduleId: string, checked: boolean) => {
      if (checked) {
        if (!selectedModules.includes(moduleId)) {
          setSelectedModules([...selectedModules, moduleId]);
        }
      } else {
        setSelectedModules(selectedModules.filter((id) => id !== moduleId));
    
      }
    };
const onFinish=(values:any) => {
console.log(values)
}
    return (
      <Modal
        closable={false}
        className='custom-modal'
        title={
          <div className='d-flex fs-3 align-items-center justify-content-center '>
            <p className='mb-0 font-weight-bold '>Create New Role</p>
          </div>
        }
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form layout='vertical' form={form}
        onFinish={onFinish}
        >
          {/* Role Name Input */}
          <Item
  className="mb-2"
  name="role"
  label="Title"
  rules={[
    {
      required: true,
      message: 'Please enter a valid role name. (e.g., admin, sales manager, installer)',
      pattern: /^(admin|sales manager|installer|customer)$/i,
    },
  ]}
>
  <Input className='radius-large primaryInput' placeholder="Enter Title" />
</Item>

          {/* Modules and Permissions Heading */}
          <div className="mb-2">
            <h6>Select Modules & Permissions</h6>
          </div>

          {/* Module Selection with Checkboxes */}
          <Item name="moduleSelection" className="mb-2">
          <Collapse
              accordion
              // activeKey={selectedModules}
              // onChange={(keys) => setSelectedModules(keys as string[])}
            >
              {modules.map((module, index) => (
                <Panel
                  key={index.toString()}
                  header={
                    <div className="d-flex align-items-center justify-content-between">
                   <Checkbox
                      onChange={(e) => handleModuleSelection(module.id, e.target.checked)}
                    >
                      {module.title}
                    </Checkbox>
                      {selectedModules?.includes(module.id) && (
                  <Radio.Group>
                    <Radio.Button value="edit">Edit</Radio.Button>
                    <Radio.Button value="view">View</Radio.Button>
                  </Radio.Group>
                )}
                    </div>
                  }
                >

                    {module.subModules.map((subModule, subIndex) => (
                      <div className='mb-2'>

                       <Checkbox
                       className=''
                       //  onChange={(e) => handleModuleSelection(module.id, e.target.checked)}
                       >
                       {subModule}
                     </Checkbox>
                       </div>
                    ))}
                 
                </Panel>
              ))}
            </Collapse>
        
          </Item>

          <div className="row mt-3">
            <div className="col-6 px-1">
              <Button size="large" className='w-100' type='ghost' onClick={onCancel}>
                Cancel
              </Button>
            </div>
            <div className="col-6 px-1">
              <Button size="large" className='w-100' type="primary" htmlType='submit'>
                Create Role
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    );
  };

  export default CreateRoleModal;
