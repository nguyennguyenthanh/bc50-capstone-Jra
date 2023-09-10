import { LockOutlined, MailOutlined, FacebookOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerData } from './duck/actions';
import { Fragment } from 'react';

const RegisterPage: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const error: any = useSelector((state: any) => state.registerReducer.error);
  const onFinish = (values: any) => {
    dispatch(registerData(values, navigate));
  };

  const renderError = () => {
    return <div className='alert alert-danger'>{error?.response.data.message}</div>;
  }

  return (
    <div className='container'>
      <div className='flex items-center justify-center' style={{ height: window.innerHeight }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h1 className='font-medium text-4xl text-center mb-5'>Sign Up Page</h1>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Your Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!'
              },
              {
                type: "email",
                message: 'Please write in the correct email format!'
              }
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Your Email" />
          </Form.Item>

          <Form.Item
            name="passWord"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type='number'
              placeholder="Your Phone Number"
            />
          </Form.Item>
          <Fragment>
            {error && renderError()}
          </Fragment>
          <Form.Item className='text-center'>
            <Button type="primary" htmlType="submit" className="login-form-button w-full bg-blue-400 font-medium">
              Sign Up
            </Button>
            <Form.Item noStyle>
              You have an account!!!
            </Form.Item>
            <Link to={'/user-login/auth'} className='text-blue-600'> Login now!</Link>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <a
              className="rounded-full w-full text-white transition-colors bg-blue-800 hover:bg-blue-400 font-medium text-2xl p-1 px-2 hover:text-white" >
              <FacebookOutlined />
            </a>
            <a
              className="rounded-full w-full text-white transition-colors bg-blue-600 hover:bg-blue-400 font-medium text-2xl p-1 px-2 ml-4 hover:text-white" >
              <TwitterOutlined />
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
