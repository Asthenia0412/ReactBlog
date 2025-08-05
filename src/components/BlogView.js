import React from 'react';
import { Typography, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from '../store/blogSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const { Title } = Typography;

function BlogView() {
  const current = useSelector(state => state.blog.current);
  const dispatch = useDispatch();

  if (!current) return <div>未选择博客</div>;

  return (
    <div>
      <Title level={2}>{current.title}</Title>
      <div style={{ marginBottom: 16, color: '#888' }}>{current.date}</div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{current.content}</ReactMarkdown>
      <Button style={{ marginTop: 24 }} onClick={() => dispatch(setView('list'))}>返回列表</Button>
    </div>
  );
}

export default BlogView;
