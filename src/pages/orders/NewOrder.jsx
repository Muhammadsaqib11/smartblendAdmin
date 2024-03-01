import { Button, Divider, Input, Select } from 'antd';
import React, { useState } from 'react';
import { PaperClipOutlined, SaveOutlined, UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Form, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';

const NewOrder = () => {
  const initialButtons = [
    'Windows',
    'Internal Doors',
    'Frames',
    'Mosquito Nets',
    'Bins and Accessories',
    'Roller Shutters and Accessories',
    'Shutters',
    'Railings',
  ];
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [isGreen, setIsGreen] = useState(false);
  const [buttonText, setButtonText] = useState('Copy Customer Link');
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const handleClick = () => {
    setIsGreen(true);
    setButtonText('Customer Link Copied');

    // Reset the color and text after 10 seconds
    setTimeout(() => {
      setIsGreen(false);
      setButtonText('Copy Customer Link');
    }, 3000);
  };
  const handleButtonClick = button => {
    const isSelected = selectedButtons.includes(button);

    if (isSelected) {
      setSelectedButtons(selectedButtons.filter(selectedButton => selectedButton !== button));
    } else {
      setSelectedButtons([...selectedButtons, button]);
    }
  };
  return (
    <div className="container-fluid bg-white px-3">
      <div className=" p-3 row mb-3 border-bottom align-items-center" style={{ top: -6, position: 'relative' }}>
        <div className=" col-xl-4 col-lg-12 mb-2 px-0">
          <h4 className="mb-0">New Order #ORD66554</h4>
        </div>

        <div div className=" col-xl-8   ">
          <div className="row   justify-content-end">
            <div className="col-md-4 col-12 pr-1 mb-3 mb-xl-0 mb-lg-0 mb-md-0   ">
              <Button
                size="large"
                className={`w-100 p-2 radius-large  ${isGreen ? ' green-background' : ''}`}
                type="ghost"
                onClick={handleClick}
              >
                {isGreen ? (
                  <CheckCircleOutlined style={{ top: -3, position: 'relative' }} />
                ) : (
                  <PaperClipOutlined style={{ top: -3, position: 'relative' }} />
                )}

                {buttonText}
              </Button>
            </div>
            <div className="col-md-4 col-6 px-1 ">
              <Button
                size="large"
                className=" p-2 radius-large w-100"
                type="ghost"
                onClick={() => {
                  navigate('/orders');
                }}
              >
                Cancel
              </Button>
            </div>
            <div className="col-md-4 col-6 px-1 ">
              <Button
                size="large"
                className=" p-2 radius-large w-100"
                type="primary"
                onClick={() => {
                  navigate('/orders');
                }}
              >
                {/* <SaveOutlined /> */}
                <SaveOutlined style={{ top: -3, position: 'relative' }} />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Form
        layout="vertical"
        //   className="login-page-form"
      >
        <h5 className="mb-4">Construction Site Data</h5>
        <div className="row">
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Select Customer </span>}
              name="Customer"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select listItemHeight={33} size="large" className="w-100 radius-large" placeholder="John Doe">
                <Select.Option value="JohnDoe">John Doe</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Quotation </span>}
              name="Quotation"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="radius-large primaryInput  "
                size="large"
                prefix={<PaperClipOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={<UploadOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Select Sales Manager </span>}
              name="Customer1"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select listItemHeight={33} size="large" className="w-100 radius-large" placeholder="John Doe">
                <Select.Option value="John Doe">John Doe</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Form.Item
              label={<span className="text-capitalize">Select Installer </span>}
              name="Customer2"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select listItemHeight={33} size="large" className="w-100 radius-large" placeholder="John Doe">
                <Select.Option value="John Doe">John Doe</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-9">
            <Form.Item
              label={<span className="text-capitalize">Warehouse Address </span>}
              name="Warehouse"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
            </Form.Item>
          </div>
        </div>

        <Form.Item
          label={<span className="text-capitalize">Construction Site Address </span>}
          name="Warehouse1"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
        </Form.Item>
        <Divider />

        <h5 className="mb-4">Contractual Timing</h5>
        <div className="row">
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Upfront Payment 1 Date </span>}
              name="Customer4"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                size="large"
                className="radius-large w-100 px-2"
              />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Contractual Supply Time </span>}
              name="Customer5"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select listItemHeight={33} size="large" className="w-100 radius-large" placeholder="John Doe">
                <Select.Option value="John Doe">John Doe</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Maximum Contractual Installation Date </span>}
              name="Customer6"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                size="large"
                className="radius-large w-100 px-2"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Expected Delivery Date </span>}
              name="Customer7"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                size="large"
                className="radius-large w-100 px-2"
              />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Setup Date </span>}
              name="CustSetupomer8"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                size="large"
                className="radius-large w-100 px-2"
              />
            </Form.Item>
          </div>
        </div>
        <Divider />

        <h5 className="mb-4">Products Ordered</h5>

        {initialButtons.map(button => (
          <Button
            key={button}
            className="p-2 mb-2"
            type={selectedButtons.includes(button) ? 'primary' : 'default'}
            icon={<CheckCircleOutlined style={{ position: 'relative', top: -3 }} />}
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </Button>
        ))}
        <div className="col-md-4 mt-2 px-0">
          <Form.Item
            label={<span className="text-capitalize">Other </span>}
            name="Warehouse9"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
          </Form.Item>
        </div>

        <Divider />

        <h5 className="mb-4">Amounts and Invoicing</h5>
        <div className="row">
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Total Amount </span>}
              name="Amount9"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Services </span>}
              name="Services3"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Products Supply </span>}
              name="Customer11"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">90% of Products Supply </span>}
              name="Amount2"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Upfront Payment 1 (50%) </span>}
              name="Services"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
            </Form.Item>
          </div>
          <div className="col-md-4">
            <Form.Item
              label={<span className="text-capitalize">Upfront Payment 2 (30%) </span>}
              name="Customer12"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="radius-large primaryInput  " placeholder="Type here..." size="large" />
            </Form.Item>
          </div>
        </div>
        <Divider />
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-4">Total Upfront Payments </h5>

          <h5 className="mb-4">€1000</h5>
        </div>
      </Form>
    </div>
  );
};

export default NewOrder;
