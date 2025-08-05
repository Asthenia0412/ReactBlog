import React from 'react';
import { Layout, Menu } from 'antd';
import BlogList from './components/BlogList';
import BlogEditor from './components/BlogEditor';
import BlogView from './components/BlogView';
import { useSelector, useDispatch } from 'react-redux';
import { setView } from './store/blogSlice';

const { Header, Content } = Layout;

function App() {
  const view = useSelector(state => state.blog.view);
  const dispatch = useDispatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[view]}
          onClick={e => dispatch(setView(e.key))}
          items={[
            { key: 'list', label: '博客列表' },
            { key: 'editor', label: '写博客' }
          ]}
        />
      </Header>
      <Content style={{ padding: 24 }}>
        {view === 'list' && <BlogList />}
        {view === 'editor' && <BlogEditor />}
        {view === 'view' && <BlogView />}
      </Content>
    </Layout>
  );
}

export default App;
