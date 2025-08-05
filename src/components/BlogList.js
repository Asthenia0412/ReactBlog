import React from 'react';
import { List, Button, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrent, setView, deleteBlog } from '../store/blogSlice';

const { Title } = Typography;

function BlogList() {
  const blogs = useSelector(state => state.blog.blogs);
  const dispatch = useDispatch();

  return (
    <div>
      <Title level={2}>博客列表</Title>
      <List
        bordered
        dataSource={blogs}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => { dispatch(setCurrent(item)); dispatch(setView('view')); }}>查看</Button>,
              <Button type="link" onClick={() => { dispatch(setCurrent(item)); dispatch(setView('editor')); }}>编辑</Button>,
              <Button danger type="link" onClick={() => dispatch(deleteBlog(item.id))}>删除</Button>
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.date}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default BlogList;
