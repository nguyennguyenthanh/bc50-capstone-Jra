import React, { useState } from 'react';
import { DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Button, Col, DatePicker, Drawer, Form, Input, Row, Select } from 'antd';
import { NavLink } from 'react-router-dom';


const { Option } = Select;

export default function Navbar() {
  let isValid = true;
  let name = '';
  if (localStorage.getItem('UserLogin')) {
    isValid = false
    name = localStorage.getItem('UserLogin') ? JSON.parse(localStorage.getItem('UserLogin') || '').name : '';
  }
  //DropDown
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">View all projects</a>,
      key: '0',
    },
    {
      label: <a href="https://www.antgroup.com">Create projects</a>,
      key: '0',
    },
    {
      label: <li><UserOutlined className='mr-1' /><button >Thông tin cá nhân</button></li>,
      key: '1',
    },
    {
      label: <li><LogoutOutlined className='mr-1' /><button >Đăng xuất</button></li>,
      key: '2',
    },
  ];

  //Drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex justify-between h-16 mx-auto">
        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2 ml-10">
          <img src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png" alt="logo" style={{ width: '100%', height: '100%' }} />
        </a>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <Dropdown menu={{ items }} trigger={['click']} className="flex">
            <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-blue-800" onClick={(e) => e.preventDefault()}>
              <Space>
                Projects
                <DownOutlined className='text-xs' />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{ items }} trigger={['click']} className="flex">
            <a rel="noopener noreferrer" href="#" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-blue-800" onClick={(e) => e.preventDefault()}>
              <Space>
                User
                <DownOutlined className='text-xs' />
              </Space>
            </a>
          </Dropdown>
          {/* Drawer */}
          <a rel="noopener noreferrer" href="#" onClick={showDrawer} style={{ lineHeight: '0.4rem', fontSize: '1rem' }} className='flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-blue-800'>
            Create Task
          </a>
          <Drawer
            title="Create a new account"
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
            extra={
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onClose} type="primary">
                  Submit
                </Button>
              </Space>
            }
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                  >
                    <Input placeholder="Please enter user name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="url"
                    label="Url"
                    rules={[{ required: true, message: 'Please enter url' }]}
                  >
                    <Input
                      style={{ width: '100%' }}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="Please enter url"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="owner"
                    label="Owner"
                    rules={[{ required: true, message: 'Please select an owner' }]}
                  >
                    <Select placeholder="Please select an owner">
                      <Option value="xiao">Xiaoxiao Fu</Option>
                      <Option value="mao">Maomao Zhou</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Type"
                    rules={[{ required: true, message: 'Please choose the type' }]}
                  >
                    <Select placeholder="Please choose the type">
                      <Option value="private">Private</Option>
                      <Option value="public">Public</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="approver"
                    label="Approver"
                    rules={[{ required: true, message: 'Please choose the approver' }]}
                  >
                    <Select placeholder="Please choose the approver">
                      <Option value="jack">Jack Ma</Option>
                      <Option value="tom">Tom Liu</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateTime"
                    label="DateTime"
                    rules={[{ required: true, message: 'Please choose the dateTime' }]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      getPopupContainer={(trigger) => trigger.parentElement!}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: 'please enter url description',
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="please enter url description" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          {isValid && (<NavLink to={'/user-login/auth'} className="self-center px-8 py-3 rounded">Sign in</NavLink>)}
          {isValid && (<NavLink to={'/register'} className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Sign up</NavLink>)}
          {!isValid && (<Dropdown menu={{ items }} trigger={['click']} className='text-2xl'>
            <Space>
              <NavLink to={'/'}>
                <UserOutlined className='mr-1' />{'Hello ' + name}
              </NavLink>
            </Space>
          </Dropdown>)}
        </div>
        <button className="p-4 lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>

  )
}
