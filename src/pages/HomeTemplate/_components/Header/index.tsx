import React, { useState, Fragment, useEffect, useCallback, useRef } from 'react';
import { DownOutlined, UserOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Button, Col, Drawer, Form, Input, Row, Select, RadioChangeEvent, Slider } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actLogout } from '../../../UserLoginTemplate/LoginPage/duck/actions';
import { actProfileUser } from '../../Profile/duck/actions';
import { Editor } from '@tinymce/tinymce-react';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { actCreateTask, actInfoTask, fetchPriority, fetchStatus, fetchTaskType, getUserByProjectId } from './duck/actions';
import { fetchAllUser } from '../../UserPage/duck/actions';
import { fetchAllProject } from '../../ProjectPage/duck/actions';


const { Option } = Select;

interface stateTimeTracking {
  timeTrackingSpent: number,
  timeTrackingRemaining: number,
}

export default function Navbar() {
  const [form] = Form.useForm<{
    listUserAsign: [],
    taskName: string,
    description: string,
    statusId: string,
    originalEstimate: number,
    timeTrackingSpent: number,
    timeTrackingRemaining: number,
    projectId: number,
    typeId: number,
    priorityId: number
  }>();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<SizeType>('middle');
  const [timeTracking, setTimeTracking] = useState<stateTimeTracking>({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  //Close select after choose
  const selectRef: any = useRef();
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const dataProject: any = useSelector((state: any) => state.allProjectReducer.data);
  const dataTaskType: any = useSelector((state: any) => state.headerReducer.data);
  const { Priority, Status, infoTask, dataUserByProject } = useSelector((state: any) => state.headerReducer);
  console.log("🚀 ~ file: index.tsx:49 ~ Navbar ~ infoTask:", infoTask)
  console.log("🚀 ~ file: index.tsx:55 ~ Navbar ~ dataUserByProject:", dataUserByProject)
  const [description, setDesciption] = useState();
  const [listUserAsign, setListUserAsign] = useState([]);

  const userOptions = dataUserByProject?.map((item: any, index: any) => {
    return { value: item.userId, label: item.name }
  })
  useEffect(() => {
    dispatch(fetchTaskType());
    dispatch(fetchPriority());
    dispatch(fetchAllUser());
    dispatch(fetchAllProject());
    dispatch(fetchStatus());
  }, [])


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

  //SELECT
  const handleChange = useCallback((value: any) => {
    setListUserAsign(value)
    selectRef.current.blur() //whenever a user triggers value change, we call `blur()` on `Select`
  }, [])

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  //SUBMIT FORM
  const onFinish = async (values: any) => {
    values.description = description;
    values.listUserAsign = listUserAsign;
    values.originalEstimate = Number(values.originalEstimate);
    values.timeTrackingSpent = Number(values.timeTrackingSpent);
    await dispatch(actCreateTask(values, navigate));
    await dispatch(actInfoTask(values));
    await form.resetFields();
  };

  const handleEditorChange = (content: any, editor: any) => {
    setDesciption(content);
  }
  const initialValues = {
    listUserAsign: [],
    taskName: '',
    description: '',
    statusId: Status?.statusId,
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: dataProject?.id,
    typeId: dataTaskType?.id,
    priorityId: Priority?.priorityId
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
            title="Create Task"
            width={720}
            onClose={onClose}
            open={open}
            bodyStyle={{ paddingBottom: 80 }}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={initialValues}
              onFinish={onFinish}
            // onChange={}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="projectId"
                    label="Project"
                    rules={[{ required: true, message: 'Please select an Project' }]}
                  >
                    <Select placeholder="Please select an Project" onChange={(idProject: number) => {
                      dispatch(getUserByProjectId(idProject))
                    }}>
                      {dataProject?.map((project: any, index: any) => {
                        return <Option key={index} value={project.id}>{project.projectName}</Option>
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="taskName"
                    label="Task name"
                    rules={[{ required: true, message: 'Please enter Task name' }]}
                  >
                    <Input placeholder='Task name' />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="statusId"
                    label="Status"
                    rules={[{ required: true, message: 'Please select an Status' }]}
                  >
                    <Select placeholder="Please select an Status">
                      {Status?.map((status: any, index: any) => <Option key={index} value={status.statusId}>{status.statusName}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="priorityId"
                    label="Priority"
                    rules={[{ required: true, message: 'Please select an Priority' }]}
                  >
                    <Select placeholder="Please select an Priority">
                      {Priority?.map((priority: any, index: any) => {
                        return <Option key={index} value={priority.priorityId}>{priority.priority}</Option>
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="typeId"
                    label="Task Type"
                    rules={[{ required: true, message: 'Please select an Task Type' }]}
                  >
                    <Select placeholder="Please select an Task Type">
                      {dataTaskType?.map((task: any, index: any) => {
                        return <Option key={index} value={task.id}>{task.taskType}</Option>
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="timeTrackingRemaining"
                    label="Time Tracking"
                    rules={[{ required: true, message: 'Please enter Time Tracking' }]}
                  >
                    <Slider defaultValue={30} value={Number(timeTracking.timeTrackingSpent)} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                    <Row gutter={16} className='mb-2'>
                      <Col span={12} className='text-left font-medium'>{timeTracking.timeTrackingSpent}h logged</Col>
                      <Col span={12} className='text-right font-medium'>{timeTracking.timeTrackingRemaining}h remaining</Col>
                    </Row>
                  </Form.Item>
                  <Row gutter={16} className='flex justify-around'>
                    <Form.Item
                      name="timeTrackingSpent"
                      label="Hours spent"
                      rules={[{ required: true, message: 'Please enter Hours spent' }]}
                    >
                      <Col span={24}>
                        <Input type='number' defaultValue={0} min={0} placeholder="Hours spent" name='timeTrackingSpent'
                          onChange={(e) => {
                            setTimeTracking({
                              ...timeTracking,
                              timeTrackingSpent: Number(e.target.value),
                            })
                          }} />
                      </Col>
                    </Form.Item>
                    <Form.Item
                      name="originalEstimate"
                      label="Total Estimated Hours"
                      rules={[{ required: true, message: 'Please enter Total Estimated Hours' }]}
                    >
                      <Col span={24}>
                        <Input type='number' defaultValue={0} min={0} placeholder="Total Estimated Hours" name='originalEstimate' onChange={(e) => {
                          setTimeTracking({
                            ...timeTracking,
                            timeTrackingRemaining: Number(e.target.value),
                          })
                        }} />
                      </Col>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="assigness"
                    label="Assigness"
                    rules={[{ required: true, message: 'Please select an Assigness' }]}
                  >
                    <Select
                      mode="multiple"
                      size={size}
                      placeholder="chose Assigness"
                      onChange={handleChange}
                      style={{ width: '100%' }}
                      options={userOptions}
                      optionFilterProp='label'
                      ref={selectRef}
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
                        message: 'please enter description',
                      },
                    ]}
                  >
                    <Editor
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                      }}
                      onEditorChange={handleEditorChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item className='flex flex-row-reverse mt-12'>
                    <Space>

                      <Button onClick={onClose} type="primary" htmlType="submit" className='bg-blue-500'>
                        Create
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </Space>
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
