import { createSlice } from '@reduxjs/toolkit';

const loadBlogs = () => {
  try {
    const data = localStorage.getItem('blogs');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  blogs: loadBlogs(),
  current: null,
  view: 'list',
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlog(state, action) {
      state.blogs.push(action.payload);
      localStorage.setItem('blogs', JSON.stringify(state.blogs));
    },
    updateBlog(state, action) {
      const idx = state.blogs.findIndex(b => b.id === action.payload.id);
      if (idx !== -1) {
        state.blogs[idx] = action.payload;
        localStorage.setItem('blogs', JSON.stringify(state.blogs));
      }
    },
    deleteBlog(state, action) {
      state.blogs = state.blogs.filter(b => b.id !== action.payload);
      localStorage.setItem('blogs', JSON.stringify(state.blogs));
    },
    setCurrent(state, action) {
      state.current = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    }
  }
});

export const { addBlog, updateBlog, deleteBlog, setCurrent, setView } = blogSlice.actions;
export default blogSlice.reducer;
