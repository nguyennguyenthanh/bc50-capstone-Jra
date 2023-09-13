import { LockOutlined, MailOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { actGetProfileUser, actProfileUser, fetchProfileUser } from './duck/actions';



const ProfilePage: React.FC = () => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const error: any = useSelector((state: any) => state.profileUserReducer.error);
  const { profileUser } = useSelector((state: any) => state.profileUserReducer);

  const onFinish = (values: any) => {
    console.log("🚀 ~ file: index.tsx:21 ~ onFinish ~ values:", values)
    dispatch(actGetProfileUser(values, navigate));
  };

  const renderError = () => {
    return <div className='alert alert-danger'>{error?.response.data.message}</div>;
  }

  const initialValues = {
    id: 0,
    email: "",
    name: "",
    phoneNumber: 0,
    passWord: "",
  }
  const resultProfile: string | null = localStorage.getItem('UserLogin');
  return (
    <div className='container'>
      <div className='grid grid-cols-12 mt-10'>
        <div className='col-span-4'>
          <img src={resultProfile ? JSON.parse(resultProfile)?.avatar : null} alt="" className='rounded-full w-3/4' />
        </div>
        <div className='col-span-8' style={{ height: window.innerHeight / 1.2 }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={profileUser !== '' ? profileUser : initialValues}
            onFinish={onFinish}
          >
            <h1 className='font-medium text-4xl mb-4'>Sign Up Page</h1>

            <Form.Item
              name="id"
              rules={[{ required: true, message: 'Please input your ID!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Your ID"
                disabled={true}
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
              name="name"
              rules={[{ required: true, message: 'Please input your Name!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Your Name"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[{ required: true, message: 'Please input your Phone Number!' }]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Your Phone Number"
              />
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

            <Fragment>
              {error && renderError()}
            </Fragment>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className='bg-blue-400 font-medium' >
                  Update
                </Button>
                <Button htmlType="button">
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
