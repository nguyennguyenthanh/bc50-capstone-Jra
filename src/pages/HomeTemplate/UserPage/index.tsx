import React, { useEffect, Fragment, useState, useRef } from 'react';
import { Button, Table, Input, Modal, Form, Space } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, LockOutlined, UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DeleteUser, UpdateUser, actUpdateSelectUser, fetchAllUser } from './duck/actions';



export default function UserPage() {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const dataUser: any = useSelector((state: any) => state.allUserReducer.data);
  const { infoUser } = useSelector((state: any) => state.allUserReducer);
  const error: any = useSelector((state: any) => state.allUserReducer.error);
  const [form] = Form.useForm<{
    userId: string,
    email: string,
    name: string,
    phoneNumber: string,
    avatar: string,
  }>();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  useEffect(() => {
    dispatch(fetchAllUser());
  }, []);


  useEffect(() => {
    form.setFieldsValue(infoUser);
  }, [infoUser]);

  const handleInfoUpdateUser = (userId: any) => {
    const user: any = dataUser?.find((user: any) => user.userId === userId);
    console.log("user", user);
    dispatch(actUpdateSelectUser(user));
    showModal();
  }
  //Table Antd
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      sorter: (a: any, b: any) => {
        return a.id - b.id;
      },
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      sorter: (a: any, b: any) => {
        let NameA = a.name?.trim().toLowerCase();
        let NameB = b.name?.trim().toLowerCase();
        if (NameA > NameB) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      sorter: (a: any, b: any) => {
        return a.userId - b.userId;
      },
      width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a: any, b: any) => {
        let emailA = a.email?.trim().toLowerCase();
        let emailB = b.email?.trim().toLowerCase();
        if (emailA > emailB) {
          return -1;
        }
        return 1;
      },
      width: '20%',

    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      width: '15%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '15%',
    },
  ];


  const renderData = () => {
    const data = dataUser && dataUser.length ? dataUser?.map((item: any, index: any) => {
      return {
        key: index,
        id: index,
        userId: item.userId,
        name: item.name,
        avatar: item.avatar,
        email: item.email,
        phoneNumber: item.phoneNumber,
        actions: <Fragment >
          <Button key={1} style={{ paddingBottom: '40px' }} className='text-2xl border-none' onClick={() => handleInfoUpdateUser(item.userId)}><EditOutlined style={{ color: 'blue' }} /></Button>
          <Button key={2} style={{ paddingBottom: '43px', paddingTop: '0px' }} className='ml-1 text-2xl border-none' onClick={async () => {
            if (window.confirm('Are you sure to remove this ID user from the list?' + item.userId)) {
              await dispatch(DeleteUser(item.userId));
              await dispatch(fetchAllUser());
            }
          }}><DeleteOutlined style={{ color: 'red' }} /></Button>
        </Fragment>
      }

    }) : [];
    return <Table columns={columns} dataSource={data} onChange={onChange} />
  }

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  };
  //Search-Bar
  const { Search } = Input;

  const onSearch = (value: any) => {
    dispatch(fetchAllUser(value))
  };


  //MODAL UPDATE 

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onFinish = async (values: any) => {
    await dispatch(UpdateUser(values, navigate));
    await handleCancel()
    await dispatch(fetchAllUser());
  };

  const renderError = () => {
    return <div className='alert alert-danger'>{error?.response.data.message}</div>;
  }
  const initialValues = {
    userId: "",
    email: "",
    name: "",
    phoneNumber: "",
    passWord: "",
  }

  return (
    <div className='mt-4 container'>
      <h3>All Users</h3>
      <Search
        className='my-4 rounded bg-blue-500 w-1/4'
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        allowClear
        onSearch={onSearch}
      />
      <Modal
        forceRender
        title={<div className='flex'>
          <h3>Edit User</h3>
        </div>}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <hr />

        <Form
          form={form}
          name="normal_login"
          layout="vertical"
          className="login-form"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            label="Id"
            name="userId"
            rules={[{ required: true, message: 'Please input your ID!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Your ID"
              disabled={true}
            />
          </Form.Item>

          <Form.Item
            label="Email"
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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Your Name"
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
          >
            <Input
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Your Phone Number"
            />
          </Form.Item>

          <Form.Item
            label="Password"
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
            <Button type="primary" htmlType="submit" className='bg-blue-400 font-medium' style={{ position: 'absolute', left: '63%', top: '177%' }}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {renderData()}
    </div>
  )
}
