import { FC, useEffect, useState } from 'react';

import './index.less';

import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';

import { RegisterAsync, loginAsync } from '../../stores/user.action';
import whiteLogo from '../../assets/logo/whiteLogo.png';
// import { login } from 'react-feather';
import ForgotPasswordModal from './ForgotPasswordModal';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const initialValues = {
  username: 'guest',
  password: 'guest',
  // remember: true
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const onForgotPasswordClick = () => {
    setForgotPasswordModalVisible(true);
  };

  const onCancelForgotPassword = () => {
    setForgotPasswordModalVisible(false);
  };

  useEffect(() => {
    const storedRememberMe = localStorage.getItem('rememberMe');
    if (storedRememberMe !== null) {
      setRememberMe(JSON.parse(storedRememberMe));
    }

    // if (rememberMe) {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    form.setFieldsValue({ email: storedEmail, password: storedPassword, remember: JSON.parse(storedRememberMe) });
  }, [rememberMe]);
  const onFinished = async form => {

    if (!register) {
      setLoading(true)
      console.log("form", form);
      const res = await dispatch(loginAsync(form));
      console.log("12121212", res);

      if (!!res) {


        const search = formatSearch(location.search);
        const from = search.from || { pathname: '/' };

        navigate(from);

        if (form.remember) {
          localStorage.setItem('username', form.username);
          localStorage.setItem('password', form.password);
          localStorage.setItem('rememberMe', form.remember);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
        setLoading(false)

      }
      else {
        console.log("ressssssssssssssssssssss")
        setLoading(false)

      }
    }
    else {
      setLoading(true)

      console.log("form", form);
      const res = await dispatch(RegisterAsync(form));
      console.log("res", res);
      if (!!res) {
        const search = formatSearch(location.search);
        const from = search.from || { pathname: '/' };

        navigate(from);

        if (form.remember) {
          localStorage.setItem('username', form.username);
          localStorage.setItem('password', form.password);
          localStorage.setItem('rememberMe', form.remember);
        } else {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.removeItem('rememberMe');
        }
        setLoading(false)

      }
      else {
        setLoading(false)

      }
    }
  };

  return (

    <Spin tip="Loading..." indicator={antIcon} spinning={loading}>
      <div className="login-page">
        <div className="container-fluid">
          <div className="row  row-reverse-mobile   align-items-center">
            <div className="col-md-8 bgLogin">
              <img src={whiteLogo} height={130} alt="" />
            </div>
            <div className="col-md-4">
              <Form form={form} layout="vertical"

                onFinish={onFinished} className="login-page-form px-3">

                {!register ? (<h1 className="mb-4">Login</h1>) : (<h1 className="mb-4">Register</h1>)}
                {!register ? (<p className=" font-weight-bold mb-4 welcome-text">Welcome Back!</p>) :
                  (<p className=" font-weight-bold mb-4 welcome-text">Welcome !</p>)}


                <Form.Item
                  label="UserName"
                  name="username"
                  rules={[
                    {
                      required: true,
                      // message: formatMessage({
                      //   id: 'gloabal.tips.enterUsernameMessage',
                      // }),
                    },
                  ]}
                >
                  {/* {email} */}
                  <Input
                    // defaultValue={email}
                    className="radius-large primaryInput"
                    placeholder="username"
                  />
                </Form.Item>
                <Form.Item
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
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Item name="remember" valuePropName="checked" initialValue={rememberMe}>
                    <Checkbox className="text-capitalize">Remember Me</Checkbox>
                  </Form.Item>
                  <p
                    className="text-primary font-weight-medium cursor-pointer text-uppercase"
                    onClick={onForgotPasswordClick}
                  >
                    Forgot Password?
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Item >
                    <Button htmlType="submit" type="primary" className="btn-padding">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="mr-2 feather feather-log-in"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                      </svg>{' '}
                      {!register ? (
                        loading ? "loading..." : 'login'
                      ) : (
                        loading ? "loading..." : 'Register'
                      )}
                    </Button>


                  </Form.Item>
                  <span
                    onClick={() => setRegister(!register)}
                    className="text-primary font-weight-medium cursor-pointer text-uppercase"
                  >
                    {register ? 'login' : 'Register'}
                  </span>
                </div>

              </Form>
            </div>
          </div>
        </div>
        <ForgotPasswordModal visible={forgotPasswordModalVisible} onCancel={onCancelForgotPassword} />
      </div>
    </Spin>
  );
};

export default LoginForm;
