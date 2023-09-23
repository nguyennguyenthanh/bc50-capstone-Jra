import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table, Input, Avatar, Modal } from 'antd';
import { SearchOutlined, CloseSquareOutlined, } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { DeleteUser, fetchAllUser } from '../UserPage/duck/actions';
import { assignUserProject, fetchAllProject } from '../ProjectPage/duck/actions';
import type { ColumnsType } from 'antd/es/table';
import { fetchProjectDetail } from './duck/actions';



export default function Board() {
  const dispatch: any = useDispatch();
  const dataBoard = useSelector((state: any) => state.boardReducer.data);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const strResult: string | null = localStorage.getItem('BoardProject');
  const infoBoardProject = strResult ? JSON.parse(strResult)?.projectName : null;
  const dataUser = useSelector((user: any) => user.allUserReducer.data);
  const dataProject: any = useSelector((state: any) => state.allProjectReducer.data);
  useEffect(() => {
    dispatch(fetchAllUser());
  }, [])

  useEffect(() => {
    dispatch(fetchAllProject());
  }, []);

  useEffect(() => {
    dispatch(fetchProjectDetail(strResult ? JSON.parse(strResult)?.id : null))
  }, [])
  //MODAL ADD MEMBERS
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleAddMembers = () => {
    showModal()
  }
  //Search in modal
  const { Search } = Input;

  const onSearch = (value: any) => {
    dispatch(fetchAllUser(value))
  };

  //TABLE
  interface DataType {
    key: React.Key;
    userId: string,
    name: string,
    avatar: string,
    email: string,
    phoneNumber: string
  }

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'avatar',
      width: '7%',
    },
    {
      dataIndex: 'name',
      width: '40%',
      render: (text: any, record: any, index: any) => {
        return <Fragment>
          <div className='mb-1'>{record.name}</div>
          <span className='text-gray-400 font-light'>User ID: {record.userId}</span>
        </Fragment>
      }
    },
    {
      dataIndex: 'actions',
      width: '15%',
    },
  ];

  const renderData = () => {
    const data = dataUser && dataUser.length ? dataUser?.map((item: any, index: any) => {
      return {
        key: index,
        userId: item.userId,
        name: item.name,
        avatar: <Avatar src={item.avatar} />,
        email: item.email,
        phoneNumber: item.phoneNumber,
        actions: <Fragment >
          <Button key={1} className='bg-blue-300 font-medium' onClick={async () => {
            const dataAddMember = {
              projectId: dataBoard?.id,
              userId: item.userId,
            }
            await dispatch(assignUserProject(dataAddMember));
            await dispatch(fetchProjectDetail(dataBoard?.id));
          }}>Add</Button>
        </Fragment>
      }

    }) : [];
    return <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} className='col-span-6' />
  }

  const renderDataUserInProject = () => {
    const strResult: string | null = localStorage.getItem('BoardProject');
    const data = strResult ? JSON.parse(strResult)?.members?.map((mem: any, index: any) => {
      return {
        key: index,
        userId: mem.userId,
        name: mem.name,
        avatar: <Avatar src={mem.avatar} />,
        actions: <Fragment>
          <Button key={1} className='border-none' onClick={async () => {
            if (window.confirm('Are you sure to remove this user from the project?' + mem.userId)) {
              await dispatch(DeleteUser(mem.userId));
            }
          }}>
            <CloseSquareOutlined style={{ display: 'flex' }} className='text-red-600 text-2xl hover:bg-red-600 hover:text-white transition-all delay-150 rounded' title='Remove' />
          </Button>
        </Fragment>
      }
    }) : null;

    return <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} className='col-span-6' />
  }
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  };

  return (
    <div className='container'>
      <h5 className='my-4'><NavLink to={'/'} style={{ textDecoration: 'none' }} className='transition-all delay-150'>Projects</NavLink> / {infoBoardProject}</h5>
      <div className='grid grid-cols-8 my-3'>
        <h3 className='col-span-2'>Board</h3>
        <h5 className='col-span-2 leading-10'>Add members</h5>
        <Button className='col-span-4 w-9 h-9 flex justify-center items-center mt-1 rounded-full pb-2' style={{ fontSize: '1.2rem' }} onClick={() => handleAddMembers()}>+</Button>

        <Modal
          forceRender
          title={<div className='flex'>
            <h3 className='text-xl'>Add members to project <span className='text-blue-500'>{infoBoardProject}</span> </h3>
          </div>}
          open={open}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okButtonProps={{
            style: {
              display: "none",
            },
          }}
          width={1000}
        >
          <hr />

          <div className='flex flex-row justify-start items-center gap-28'>
            <h5>Search users</h5>
            <Search
              className='my-4 rounded bg-blue-500 w-2/5 '
              placeholder="input search text"
              enterButton={<SearchOutlined style={{ display: 'block' }} />}
              size="large"
              allowClear
              onSearch={onSearch}
            />
          </div>

          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-6'>
              <h5>Not yet added</h5>
            </div>
            <div className='col-span-6'>
              <h5>Already in project</h5>
            </div>
          </div>

          <div className='grid grid-cols-12 gap-6'>
            {renderData()}
            {renderDataUserInProject()}
          </div>
        </Modal>
      </div>

      <div className="grid grid-cols-12" style={{ marginLeft: '-8px', marginRight: '-8px', rowGap: 0 }}>
        <div className="ant-col mb-4 ant-col-xs-24 ant-col-sm-12 ant-col-lg-6 col-span-3" style={{ paddingLeft: 8, paddingRight: 8 }}>
          <div className="bg-gray-100 w-full h-full p-2 rounded">
            <div>
              <span className="inline-block px-2 py-0.5 mb-1 text-xs font-semibold rounded bg-gray-200">BACKLOG</span>
            </div>
            <div data-rbd-droppable-id={1} data-rbd-droppable-context-id={1} className="flex-grow">
              <button className="h-8 hover:bg-gray-300 focus:bg-gray-300 w-full text-left font-medium mt-1 py-1 px-1 rounded duration-300">
                <span role="img" aria-label="plus" className="anticon anticon-plus mr-1">
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <defs>
                      <style dangerouslySetInnerHTML={{ __html: "" }} />
                    </defs>
                    <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                    <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
                  </svg>
                </span>
                <span>Create</span>
              </button>
            </div>
          </div>
        </div>
        <div className="ant-col mb-4 ant-col-xs-24 ant-col-sm-12 ant-col-lg-6 col-span-3" style={{ paddingLeft: 8, paddingRight: 8 }}>
          <div className="bg-gray-100 w-full h-full p-2 rounded">
            <div>
              <span className="inline-block px-0.5 py-0.5 mb-1 text-xs font-semibold rounded bg-indigo-200">SELECTED FOR DEVELOPMENT</span>
            </div>
            <div data-rbd-droppable-id={2} data-rbd-droppable-context-id={1} className="flex-grow" />
          </div>
        </div>
        <div className="ant-col mb-4 ant-col-xs-24 ant-col-sm-12 ant-col-lg-6 col-span-3" style={{ paddingLeft: 8, paddingRight: 8 }}>
          <div className="bg-gray-100 w-full h-full p-2 rounded">
            <div>
              <span className="inline-block px-2 py-0.5 mb-1 text-xs font-semibold rounded bg-blue-200">IN PROGRESS</span>
            </div>
            <div data-rbd-droppable-id={3} data-rbd-droppable-context-id={1} className="flex-grow" />
          </div>
        </div>
        <div className="ant-col mb-4 ant-col-xs-24 ant-col-sm-12 ant-col-lg-6 col-span-3" style={{ paddingLeft: 8, paddingRight: 8 }}>
          <div className="bg-gray-100 w-full h-full p-2 rounded">
            <div>
              <span className="inline-block px-2 py-0.5 mb-1 text-xs font-semibold rounded bg-green-200 ">DONE</span>
            </div>
            <div data-rbd-droppable-id={4} data-rbd-droppable-context-id={1} className="flex-grow" />
          </div>
        </div>
      </div>
    </div>
  )
}
