import { LockOutlined, MailOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginData } from './duck/actions';

const LoginPage: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const onFinish = (values: any) => {
    dispatch(loginData(values, navigate));
  };

  return (
    <div className='container'>
      <div className='flex items-center justify-center' style={{ height: window.innerHeight }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <h1 className='font-medium text-4xl text-center mb-5'>Login Page</h1>
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
          <Form.Item className='text-center'>
            <Button type="primary" htmlType="submit" className="login-form-button w-full bg-blue-400 font-medium">
              Log in
            </Button>
            <Form.Item noStyle>
              Don't have an account yet?
            </Form.Item>
            <NavLink to={'/register'} className='text-blue-600'> Register now!</NavLink>
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

export default LoginPage;
