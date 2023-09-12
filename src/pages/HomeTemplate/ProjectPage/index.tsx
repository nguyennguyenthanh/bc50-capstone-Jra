import React, { useEffect, Fragment, useState } from 'react';
import { Button, Table, Input, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DeleteProject, actUpdateSelectProject, fetchAllProject } from './duck/actions';

export default function ProjectPage() {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const dataProject: any = useSelector((state: any) => state.allProjectReducer.data);
  const [creator, setNameCreator] = useState([]);
  useEffect(() => {
    dispatch(fetchAllProject());
  }, []);

  const handleInfoUpdateProject = (id: any) => {
    const project = dataProject?.find((project: any) => project.id === id);
    dispatch(actUpdateSelectProject(project));
    navigate("/update-project", { replace: true });
  }
  //Table Antd
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a: any, b: any) => {
        return a.id - b.id;
      },
      width: '15%',
    },
    {
      title: 'Project name',
      dataIndex: 'projectName',
      width: '15%',
    },
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      sorter: (a: any, b: any) => {
        let categoryNameA = a.categoryName?.trim().toLowerCase();
        let categoryNameB = b.categoryName?.trim().toLowerCase();
        if (categoryNameA > categoryNameB) {
          return -1;
        }
        return 1;
      },
      width: '20%',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      sorter: (a: any, b: any) => {
        let creatorA = a.creator?.name?.trim().toLowerCase();
        let creatorB = b.creator?.name?.trim().toLowerCase();
        if (creatorA > creatorB) {
          return -1;
        }
        return 1;
      },
      width: '20%',

    },
    {
      title: 'Members',
      dataIndex: 'members',
      width: '15%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '15%',
    },
  ];


  const renderData = () => {
    const data = dataProject && dataProject.length ? dataProject?.map((item: any, index: any) => {
      return {
        key: index,
        id: item.id,
        projectName: <a href='#'>{item.projectName}</a>,
        categoryName: item.categoryName,
        creator: item.creator.name,
        members: item.members?.map((item: any, index: number | string) => <img key={index} src={item.avatar} alt={item.avatar} className='inline-block h-8 w-8 rounded-full ring-2 ring-white' />),
        actions: <Fragment >
          <Button key={1} style={{ paddingBottom: '40px' }} className='text-2xl border-none' onClick={() => handleInfoUpdateProject(item.id)}><EditOutlined style={{ color: 'blue' }} /></Button>
          <Button key={2} style={{ paddingBottom: '43px', paddingTop: '0px' }} className='ml-2 text-2xl border-none' onClick={async () => {
            if (window.confirm('Bạn có chắc muốn xóa dự án này ' + item.id)) {
              await dispatch(DeleteProject(item.id));
              await dispatch(fetchAllProject());
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
    dispatch(fetchAllProject(value))
  };
  return (
    <div className='mt-4 container'>
      <div className='flex justify-between'>
        <h3>All Projects</h3>
        <NavLink to={'/create-project'} className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-3 border border-blue-700 rounded text-sm transition-all delay-150' style={{ textDecoration: 'none' }}>Create Project</NavLink>
      </div>
      <Search
        className='my-4 rounded bg-blue-500 w-1/4'
        placeholder="input search text"
        enterButton={<SearchOutlined />}
        size="large"
        allowClear
        onSearch={onSearch}
      />
      {renderData()}
    </div>
  )
}
