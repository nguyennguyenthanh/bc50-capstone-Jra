import React, { useRef, useEffect, useState } from 'react'
import { Button, Form, Input, message, Space, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProject, fetchAllProject } from '../ProjectPage/duck/actions';
import { fetchProjectCategory } from '../CreateProjectPage/duck/actions';



export default function UpdateProjectPage() {
  const [form] = Form.useForm();
  const [description, setDesciption] = useState();
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const { data } = useSelector((state: any) => state.createProjectReducer);
  const { infoProject } = useSelector((state: any) => state.allProjectReducer);


  useEffect(() => {
    dispatch(fetchProjectCategory());
  }, []);

  useEffect(() => {
    dispatch(fetchAllProject());
  }, []);

  const onFinish = (value: any) => {
    value.description = infoProject?.description;
    value.creator = infoProject?.creator.id;
    dispatch(UpdateProject(value, navigate));
  };

  const handleEditorChange = (content: any, editor: any) => {
    setDesciption(content);
  }

  const renderSelect = () => {
    return data && data.length ? data?.map((item: any, index: number | string) => <Select.Option key={index} value={item.id}>{item.projectCategoryName}</Select.Option>) : [];
  }
  const initialValues = {
    members: [
      {
        userId: 0,
        name: "",
        avatar: "",
      }
    ],
    id: 0,
    projectName: "",
    categoryId: "",
    categoryName: "",
    deleted: false,
  }
  return (
    <div className='container mt-4'>
      <h5 className='text-xl'><NavLink to={'/'} style={{ textDecoration: 'none' }} className='transition-all delay-150 '>Projects</NavLink>/<NavLink to={'/'} style={{ textDecoration: 'none' }} className='transition-all delay-150 '> {
        infoProject?.projectName
      }</NavLink> / New project</h5>
      <h3 className='my-3'>Update Project</h3>
      <div className="container">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={infoProject !== undefined ? infoProject : initialValues}
        >
          <Form.Item
            name="id"
            label="Project ID"
            rules={[{ required: true, message: 'Please input Project ID!' }]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="projectName"
            label="Project name"
            rules={[{ required: true, message: 'Please input Project Name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Project category"
            rules={[{ required: true, message: 'Please choose Project!' }]}
          >
            <Select placeholder="Select a project category">
              {renderSelect()}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
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
    </div >
  )
}
