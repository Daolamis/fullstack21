import blogService from '../services/blogs';
import { setNotification } from './notification';

const blogLikeCompare = (elem1, elem2) => elem2.likes - elem1.likes;

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.sort(blogLikeCompare);
    case 'CREATE_BLOG':
      return [...state, action.data];
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id);
    case 'UPDATE_BLOG': {
      const _state = state.map(b => b.id !== action.data.id ? b : action.data);
      return _state.sort(blogLikeCompare);
    }
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
      });
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id);
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id: blog.id }
      });
      dispatch(setNotification(`Blog ${blog.title} is removed`));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addLikes(blog);
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      });
      dispatch(setNotification(`Liked ${updatedBlog.title}, it has now ${updatedBlog.likes} likes`));
    } catch (e) {
      dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export default reducer;