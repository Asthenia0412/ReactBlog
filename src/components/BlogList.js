import React from 'react';
import { List, Button, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrent, setView, deleteBlog } from '../store/blogSlice';

const { Title } = Typography;

function BlogList() {
  const blogs = useSelector(state => state.blog.blogs);
  const dispatch = useDispatch();

  // 优化：删除后如果当前博客被删除，跳回列表
  const current = useSelector(state => state.blog.current);
  const view = useSelector(state => state.blog.view);

  const handleDelete = id => {
    dispatch(deleteBlog(id));
    if (current && current.id === id) {
      dispatch(setCurrent(null));
      dispatch(setView('list'));
    }
  };

  const handleView = item => {
    dispatch(setCurrent(item));
    dispatch(setView('view'));
  };

  const handleEdit = item => {
    dispatch(setCurrent(item));
    dispatch(setView('editor'));
  };

  return (
    <div>
      <Title level={2}>博客列表</Title>
      <List
        bordered
        locale={{ emptyText: '暂无博客，快去写一篇吧！' }}
        dataSource={blogs}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <Button type="link" onClick={() => handleView(item)}>查看</Button>,
              <Button type="link" onClick={() => handleEdit(item)}>编辑</Button>,
              <Button danger type="link" onClick={() => handleDelete(item.id)}>删除</Button>
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
