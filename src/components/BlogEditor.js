import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, updateBlog, setView, setCurrent } from '../store/blogSlice';

const { Title } = Typography;

function BlogEditor() {
  const dispatch = useDispatch();
  const current = useSelector(state => state.blog.current);
  const [form] = Form.useForm();

  useEffect(() => {
    if (current) {
      form.setFieldsValue({ title: current.title, content: current.content });
    } else {
      form.resetFields();
    }
  }, [current, form]);

  const handleFinish = values => {
    if (current) {
      dispatch(updateBlog({ ...current, ...values }));
      dispatch(setCurrent(null));
    } else {
      dispatch(addBlog({ ...values, id: Date.now(), date: new Date().toLocaleString() }));
    }
    dispatch(setView('list'));
  };

  return (
    <div>
      <Title level={2}>{current ? '编辑博客' : '新建博客'}</Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}> <Input /> </Form.Item>
        <Form.Item name="content" label="内容 (Markdown)" rules={[{ required: true, message: '请输入内容' }]}> <Input.TextArea rows={10} /> </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">保存</Button>
          <Button style={{ marginLeft: 8 }} onClick={() => { dispatch(setView('list')); dispatch(setCurrent(null)); }}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default BlogEditor;
