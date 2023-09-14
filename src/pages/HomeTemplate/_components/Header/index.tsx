import React, { useState, Fragment, useEffect } from 'react';
import { DownOutlined, UserOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Button, Col, DatePicker, Drawer, Form, Input, Row, Select } from 'antd';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actLogout } from '../../../UserLoginTemplate/LoginPage/duck/actions';
import { actProfileUser, fetchProfileUser } from '../../Profile/duck/actions';


const { Option } = Select;

export default function Navbar() {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  let isValid: boolean = true;
  let name: string = '';
  if (localStorage.getItem('UserLogin')) {
    isValid = false
    name = (localStorage.getItem('UserLogin') || '') ? JSON.parse(localStorage.getItem('UserLogin') || '').name : '';
  }

  const handleLogout = () => {
    dispatch(actLogout(navigate))
  }
  //DropDown
  const items: MenuProps['items'] = [
    {
      label: <NavLink to={'/'} style={{ textDecoration: 'none' }} className={'hover:font-medium'}>View all projects</NavLink>,
      key: '0',
    },
    {
      label: <NavLink to={'/create-project'} style={{ textDecoration: 'none' }} className={'hover:font-medium'}>Create projects</NavLink>,
      key: '1',
    },

  ];
  const items2: MenuProps['items'] = [
    {
      label: <NavLink to={'/user'} style={{ textDecoration: 'none' }} className={'hover:font-medium'}>View all users</NavLink>,
      key: '0',
    },
  ];
  const items3: MenuProps['items'] = [
    {
      label: <NavLink to={'/profiles'} style={{ textDecoration: 'none' }}><UserOutlined className='mr-1' />Profiles</NavLink>,
      key: '0',
    },
    {
      label: <button onClick={handleLogout}><LogoutOutlined className='mr-1' />Log out</button>,
      key: '1',
    },
  ];


  const items4: MenuProps['items'] = [
    {
      label: <a href="#" style={{ textDecoration: 'none' }}>Projests</a>,
      key: '0',
      children: [
        {
          key: '0-1',
          label: <NavLink to={'/'} className='hover:font-medium transition-all delay-500' style={{ textDecoration: 'none' }}>View all projects</NavLink>,
        },
        {
          key: '0-2',
          label: <NavLink to={'/create-project'} className='hover:font-medium transition-all delay-500' style={{ textDecoration: 'none' }}>Create projects</NavLink>,
        },
      ],
    },
    {
      label: <a href="#">Users</a>,
      key: '1',
      children: [
        {
          key: '1-1',
          label: <a href="#">View all users</a>,
        },
      ],
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

  const resultProfile: string | null = localStorage.getItem('UserLogin');
  const dataProfileUser = {
    id: resultProfile ? JSON.parse(resultProfile)?.id : null,
    email: resultProfile ? JSON.parse(resultProfile)?.email : null,
    name: resultProfile ? JSON.parse(resultProfile)?.name : null,
    phoneNumber: resultProfile ? JSON.parse(resultProfile)?.phoneNumber : null,
    passWord: "",
  }

  const handleProfileUser = () => {
    dispatch(actProfileUser(dataProfileUser));
  }
  return (
    <header className="p-2 dark:bg-gray-800 dark:text-gray-100 border-b-2 ">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink rel="noopener noreferrer" to={'/'} aria-label="Back to homepage" className="flex items-center p-2 ml-10" style={{ textDecoration: 'none' }}>
          <img src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png" alt="logo" style={{ width: '100%', height: '100%' }} />
          <span className='text-2xl text-black font-medium w-0' style={{ position: 'relative', right: '90px' }}>JraProject</span>
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex mt-2">
          <Dropdown menu={{ items }} trigger={['click']} >
            <a rel="noopener noreferrer" href="#" className="flex rounded-lg items-center px-3 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 focus:border-sky-400 hover:bg-blue-400  hover:rounded-lg transition-all delay-150 font-medium text-blue-600 hover:text-blue-800"
              style={{ textDecoration: 'none' }}
              onClick={(e) => e.preventDefault()}>
              <Space >
                Projects
                <DownOutlined className='text-xs' />
              </Space>
            </a>
          </Dropdown>
          <Dropdown menu={{ items: items2 }} trigger={['click']}>
            <a rel="noopener noreferrer" href="#" className="flex rounded-lg items-center px-3 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400  focus:border-sky-400 hover:bg-blue-400  hover:rounded-lg transition-all delay-150 font-medium text-blue-600 hover:text-blue-800"
              style={{ textDecoration: 'none' }}
              onClick={(e) => e.preventDefault()}>
              <Space>
                User
                <DownOutlined className='text-xs' />
              </Space>
            </a>
          </Dropdown>
          {/* Drawer */}
          <a rel="noopener noreferrer" href="#" onClick={showDrawer} style={{ lineHeight: '0.4rem', fontSize: '1rem', textDecoration: 'none' }} className='flex rounded-lg items-center p-2 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-blue-600 hover:bg-blue-400 hover:text-blue-800 hover:rounded-lg transition-all delay-150 font-medium'>
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
          {isValid && (<NavLink to={'/user-login/auth'} className="self-center px-3 py-2 rounded-lg border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-blue-600 hover:bg-blue-400 hover:text-blue-800 hover:rounded-lg transition-all delay-150 font-medium" style={{ textDecoration: 'none' }}>Sign in</NavLink>)}
          {isValid && (<NavLink to={'/register'} className="self-center px-3 py-2 ml-3 rounded-lg border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-blue-600 hover:bg-blue-400 hover:text-blue-800 hover:rounded-lg transition-all delay-150 font-medium" style={{ textDecoration: 'none' }}>Sign up</NavLink>)}
          {!isValid && (<Dropdown menu={{ items: items3 }} trigger={['click']} className='font-medium text-lg mb-2'>
            <Space>
              <a href='#' onClick={() => handleProfileUser()} style={{ textDecoration: "none" }} className='text-blue-600 hover:text-blue-800'>
                <UserOutlined className='mr-1' />{'Hello ' + name}
              </a>
            </Space>
          </Dropdown>)}
        </div>
        <div className='flex'>
          <button className="lg:hidden rounded-lg items-center h-12 px-1 mt-2 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400 hover:bg-blue-400 hover:rounded-lg transition-all delay-150 font-medium">
            <a rel="noopener noreferrer" href="#" onClick={showDrawer} style={{ textDecoration: 'none' }} className='text-blue-600 hover:text-blue-800'>
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
          </button>
          <Dropdown className="lg:hidden ml-3" menu={{ items: items4 }} trigger={['click']}
            data-toggle="collapse"
            data-target="#collapsibleNavbar">
            <MenuFoldOutlined className='text-4xl' />
          </Dropdown>
        </div>
      </div>
    </header>

  )
}
