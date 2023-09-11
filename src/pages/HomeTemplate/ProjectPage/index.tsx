import React, { useEffect, Fragment } from 'react';
import { Button, Table, Input, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { AudioOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { fetchAllProject } from './duck/actions';

export default function ProjectPage() {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const dataProject: any = useSelector((state: any) => state.allProjectReducer.data);
  console.log("🚀 ~ file: index.tsx:14 ~ ProjectPage ~ dataProject:", dataProject)

  useEffect(() => {
    dispatch(fetchAllProject());
  }, []);
  
  const handleInfoEditUser = () => {
  }
  //Table Antd
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a: any, b: any) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      width: '15%',
    },
    {
      title: 'Project name',
      dataIndex: 'projectName',
      sorter: (a: any, b: any) => {
        let matKhauA = a.matKhau.toLowerCase().trim();
        let matKhauB = b.matKhau.toLowerCase().trim();
        if (matKhauA > matKhauB) {
          return 1;
        }
        return -1;
      },
      width: '15%',
    },
    {
      title: 'Category name',
      dataIndex: 'categoryName',
      sorter: (a: any, b: any) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      width: '20%',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      sorter: (a: any, b: any) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },
      width: '20%',
    },
    {
      title: 'Members',
      dataIndex: 'members',
      sorter: (a: any, b: any) => {
        let soDTA = a.soDT.toLowerCase().trim();
        let soDTB = b.soDT.toLowerCase().trim();
        if (soDTA > soDTB) {
          return 1;
        }
        return -1;
      },
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
        projectName: item.projectName,
        categoryName: item.categoryName,
        creator: item.creator,
        members: item.members,
        actions: <Fragment >
          <Button key={1} style={{ paddingBottom: '40px' }} className='text-2xl border-none' onClick={() => handleInfoEditUser()}><EditOutlined style={{ color: 'blue' }} /></Button>
          <Button key={2} style={{ paddingBottom: '43px', paddingTop: '0px' }} className='ml-2 text-2xl border-none' onClick={() => {
            
          }}><DeleteOutlined style={{ color: 'red' }} /></Button>
        </Fragment>
      }

    }) : [];
    return <Table columns={columns} dataSource={data} onChange={onChange} />
  }

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  //Search-Bar
  const { Search } = Input;

  const onSearch = (value: any) => {
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
