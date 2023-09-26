import React, { useEffect, useState, Fragment, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table, Input, Avatar, Modal, Dropdown, Space, Form, Select, Collapse, Slider } from 'antd';
import { SearchOutlined, CloseSquareOutlined, FileDoneOutlined, WarningOutlined, DeleteOutlined, BugOutlined, AccountBookOutlined } from '@ant-design/icons';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { DeleteUser, fetchAllUser } from '../UserPage/duck/actions';
import { assignUserProject, fetchAllProject } from '../ProjectPage/duck/actions';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { actTaskDetail, deleteTask, fetchProjectDetail, fetchTaskDetail, updateStatusDragDrop } from './duck/actions';
import { fetchStatus } from '../_components/Header/duck/actions';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


interface stateTimeTracking {
  timeTrackingSpent: number,
  timeTrackingRemaining: number,
}

export default function Board() {
  const [form] = Form.useForm();
  const dispatch: any = useDispatch();
  const dataBoard = useSelector((state: any) => state.boardReducer.data);
  const { dataTaskDetail, infoTaskDetail } = useSelector((state: any) => state.boardReducer);
  const dataTaskType: any = useSelector((state: any) => state.headerReducer.data);
  const param = useParams();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const strResult: string | null = localStorage.getItem('BoardProject');
  const infoBoardProject = strResult ? JSON.parse(strResult)?.projectName : null;
  const strResultUser: string | null = localStorage.getItem('UserLogin');
  const dataUser = useSelector((user: any) => user.allUserReducer.data);
  const dataProject: any = useSelector((state: any) => state.allProjectReducer.data);
  const { Priority, Status, dataUserByProject } = useSelector((state: any) => state.headerReducer);
  const [openTaskDetail, setOpenTaskDetail] = useState(false);
  const [confirmLoadingTaskDetail, setConfirmLoadingTaskDetail] = useState(false);
  const { Option } = Select;
  const selectRef: any = useRef();
  const [size, setSize] = useState<SizeType>('middle');
  const [description, setDesciption] = useState();
  const [timeTracking, setTimeTracking] = useState<stateTimeTracking>({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUser());
    dispatch(fetchAllProject());
    dispatch(fetchProjectDetail(param.id))
    dispatch(fetchStatus());
  }, [])

  useEffect(() => {
    console.log('infoTaskDetail: ', infoTaskDetail);
    form.setFieldsValue(infoTaskDetail);
  }, [infoTaskDetail])
  //SELECT
  const handleChange = useCallback((value: any) => {
    selectRef.current.blur() //whenever a user triggers value change, we call `blur()` on `Select`
  }, [])

  const userOptions = dataTaskDetail?.assigness.map((item: any, index: any) => {
    return { value: item.userId, label: item.name }
  })

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
            <CloseSquareOutlined title='remove' style={{ display: 'flex' }} className='text-red-600 text-2xl hover:bg-red-600 hover:text-white transition-all delay-150 rounded' />
          </Button>
        </Fragment>
      }
    }) : null;

    return <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} className='col-span-6' />
  }
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
  };

  const handleDragEnd = async (result: any) => {
    let { source, destination } = result;
    const taskUpdateStatus = {
      taskId: result.draggableId,
      statusId: destination.droppableId
    }
    if (!destination) {
      return;
    }
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    await dispatch(updateStatusDragDrop(taskUpdateStatus))
    await dispatch(fetchProjectDetail(param.id))
  }
  const renderCardTaskList = () => {
    return <DragDropContext onDragEnd={handleDragEnd}>
      {dataBoard?.lstTask?.map((taskListDetail: any, index: any) => {
        return <Droppable key={index} droppableId={taskListDetail.statusId}>
          {(provided) => {
            return <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              key={index}
              className="ant-col mb-4 ant-col-xs-24 ant-col-sm-12 ant-col-lg-6 col-span-3"
              style={{ paddingLeft: 8, paddingRight: 8 }}>
              <div
                className="bg-gray-100 w-full h-full p-2 rounded">
                <span className="inline-block px-2 py-0.5 mb-1 text-xs font-semibold rounded bg-gray-200">{taskListDetail.statusName}</span>
                <div className="flex-grow">
                  {taskListDetail.statusId === '1' ? <button className="h-8 hover:bg-gray-300 focus:bg-gray-300 w-full text-left font-medium mt-1 py-1 px-1 rounded duration-300">
                    <span role="img" aria-label="plus" className="anticon anticon-plus mr-1 text-xl">+</span>
                    <span>Create</span>
                  </button> : <div className="flex-grow" />}
                </div>
                {taskListDetail.lstTaskDeTail.map((task: any, index: any) => {
                  return <Draggable key={task.taskId.toString()} index={index} draggableId={task.taskId.toString()}>
                    {(provided) => {
                      return <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index}
                        className="flex-grow"
                        onClick={async () => {
                          await showModalTaskDetail()
                          await dispatch(fetchTaskDetail(task.taskId))
                          await dispatch(actTaskDetail(task))
                        }}>
                        <div
                          className="w-full bg-white rounded py-3 px-2 mt-1 shadow">
                          <div className="ant-row" style={{ rowGap: 0 }}>
                            <div className="ant-col ant-col-24">
                              <div className="mb-2">{task.taskName}</div>
                              <div className="flex justify-start items-center">
                                <span className='mr-2'>{task.taskTypeDetail.taskType === 'bug' ? <WarningOutlined title='Bug' /> : <FileDoneOutlined title='Task' />}</span>
                                <span className="text-xs rounded px-1 pb-0.5 text-red-700 border border-red-700">{task.priorityTask.priority}</span>
                                <div className="h-full w-full flex justify-end items-end">
                                  <div className="ant-avatar-group">
                                    {task.assigness.slice(0, 2).map((mem: any, index: any) => {
                                      return <Avatar key={index} src={mem.avatar} />
                                    })}
                                    {task.assigness?.length > 2 ? <Avatar className='ring-2 ring-white'>...</Avatar> : ''}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }}
                  </Draggable>
                })}
                {provided.placeholder}
              </div>
            </div>
          }}
        </Droppable>
      })}
    </DragDropContext>
  }
  const renderMembers = () => {
    return dataBoard?.members.map((mem: any, index: any) => {
      return <Avatar key={index} src={mem.avatar} className='w-9 h-9' />
    })
  }
  //MODAL TASK DETAIL
  const showModalTaskDetail = () => {
    setOpenTaskDetail(true);
  };
  const handleCancelTaskDetail = () => {
    console.log('Clicked cancel button');
    setOpenTaskDetail(false);
  };
  const { TextArea } = Input;
  const [value, setValue] = useState('');

  const handleEditorChange = (content: any, editor: any) => {
    // setDesciption(content);
  }

  const items: MenuProps['items'] = [
    {
      label: <a href="#" style={{ textDecoration: 'none' }}><BugOutlined className='text-lime-600' /> Bug</a>,
      key: '0',
    },
    {
      label: <a href="#" style={{ textDecoration: 'none' }}><AccountBookOutlined className='text-blue-600' /> New Task</a>,
      key: '1',
    },
  ];

  const initialValues = {
    priorityTask: {
      priorityId: 0,
      priority: ''
    },
    taskTypeDetail: {
      id: 0,
      taskType: ''
    },
    assigness: [
      {
        id: 0,
        avatar: '',
        name: '',
        alias: ''
      }
    ],
    lstComment: [],
    taskId: 0,
    taskName: '',
    alias: '',
    description: '',
    statusId: '',
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    typeId: 0,
    priorityId: 0,
    projectId: 0
  }
  return (
    <div className='container'>
      <h5 className='my-4'><NavLink to={'/'} style={{ textDecoration: 'none' }} className='transition-all delay-150'>Projects</NavLink> / {infoBoardProject}</h5>
      <div className='grid grid-cols-8 my-3'>
        <h3 className='col-span-2'>Board</h3>
        <h5 className='col-span-1 leading-10'>Add members</h5>
        <div className='col-span-1 flex items-center'>{renderMembers()}</div>
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
        {renderCardTaskList()}
      </div>
      <Modal
        forceRender
        open={openTaskDetail}
        confirmLoading={confirmLoadingTaskDetail}
        onCancel={handleCancelTaskDetail}
        okButtonProps={{
          style: {
            display: "none",
          },
        }}
        width={900}
      >
        <DeleteOutlined title='Remove Task' className='text-xl text-red-600' style={{ position: 'absolute', left: '92%', bottom: '94%' }} onClick={async () => {
          if (window.confirm('Are you sure to remove this task?' + dataTaskDetail?.taskId)) {
            await dispatch(deleteTask(dataTaskDetail?.taskId, navigate));
            await setOpenTaskDetail(false);
            await dispatch(fetchProjectDetail(strResult ? JSON.parse(strResult)?.id : null))
          }
        }} />
        <Form
          form={form}
          name="normal_login"
          layout="vertical"
          className="login-form grid grid-cols-12 gap-6"
          initialValues={initialValues}
        >
          <div className='col-span-6'>
            <Form.Item
              name={['taskTypeDetail', 'taskType']}
              rules={[{ required: true, message: 'Please enter Task name' }]}
            >
              <Dropdown menu={{ items }} trigger={['click']}>
                <Space className='flex justify-between'>
                  {dataTaskDetail?.taskTypeDetail.taskType}
                </Space>
              </Dropdown>
            </Form.Item>
            <Form.Item
              name="taskName"
              rules={[{ required: true, message: 'Please enter Task name' }]}
            >
              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={dataTaskDetail?.taskName}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Please enter description',
                },
              ]}
            >
              <Editor
                init={{
                  height: 200,
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
            <Form.Item
              name="comments"
              label='Comments'
              rules={[{ required: true, message: 'Please enter Comments' }]}
            >
              <div className='flex gap-2'>
                <Avatar src={strResultUser ? JSON.parse(strResultUser)?.avatar : null} className='w-9 h-8' />
                <TextArea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder='Add a comment...'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </Form.Item>
          </div>

          <div className='col-span-6 mt-14'>

            <Form.Item
              name="statusId"
              rules={[{ required: true, message: 'Please select an statusId' }]}
            >
              <Select
                placeholder="Please select an statusId"
              >
                {Status?.map((status: any, index: any) => {
                  return <Option key={index} value={status.statusId}>{status.statusName}</Option>
                })}
              </Select>
            </Form.Item>

            <Collapse
              defaultActiveKey={['1']}
              items={[{
                key: '1',
                label: 'Details',
                children: <Fragment>
                  <Form.Item name="assigness">
                    <div className='grid grid-cols-12 gap-4 container'>
                      <span className='font-medium col-span-4 flex items-center' style={{ fontSize: '0.9rem' }}>Assignees</span>
                      <Select
                        className='col-span-8'
                        mode="multiple"
                        size={size}
                        placeholder="chose Assigness"
                        onChange={handleChange}
                        style={{ width: '85%' }}
                        options={userOptions}
                        optionFilterProp='label'
                        ref={selectRef}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item name='priorityId'>
                    <div className='grid grid-cols-12 gap-4 container'>
                      <span className='font-medium col-span-4 flex items-center' style={{ fontSize: '0.9rem' }}>Priority</span>
                      <Select
                        // value={infoTaskDetail?.priorityTask.priorityId}
                        className='col-span-8'
                        placeholder="chose Priority"
                        style={{ width: '85%' }}
                      >
                        {Priority?.map((priority: any, index: any) => {
                          return <Option key={index} value={priority.priorityId}>{priority.priority}</Option>
                        })}
                      </Select>
                    </div>
                  </Form.Item>
                  <Form.Item name="timeTrackingRemaining">
                    <div className='grid grid-cols-12 gap-4 container'>
                      <span className='font-medium col-span-4 flex items-center' style={{ fontSize: '0.9rem' }}>Time Tracking</span>
                      <Slider style={{ width: '85%' }} className='col-span-8' defaultValue={30} value={Number(timeTracking.timeTrackingSpent)} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                    </div>
                  </Form.Item>
                  <Form.Item name="originalEstimate">
                    <div className='grid grid-cols-12 gap-4 container'>
                      <span className='font-medium col-span-4 flex items-center' style={{ fontSize: '0.9rem' }}>Estimate</span>
                      <Input style={{ width: '85%' }} className='col-span-8' type='number' defaultValue={0} min={0} placeholder="Total Estimated Hours" name='originalEstimate' onChange={(e) => {
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingRemaining: Number(e.target.value),
                        })
                      }} />
                    </div>
                  </Form.Item>
                  <Form.Item name="timeTrackingSpent">
                    <div className='grid grid-cols-12 gap-4 container'>
                      <span className='font-medium col-span-4 flex items-center' style={{ fontSize: '0.9rem' }}>Hours spent</span>
                      <Input style={{ width: '85%' }} className='col-span-8' type='number' defaultValue={0} min={0} placeholder="Hours spent" name='timeTrackingSpent'
                        onChange={(e) => {
                          setTimeTracking({
                            ...timeTracking,
                            timeTrackingSpent: Number(e.target.value),
                          })
                        }} />
                    </div>
                  </Form.Item>
                </Fragment>
              }]} />
          </div>
        </Form>
      </Modal>
    </div>
  )
}

