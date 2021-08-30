import React, { useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';

import { initBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogs';
import { initUser, login, logout } from './reducers/user';

const App = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const toggleRef = useRef();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUser());
  }, []);

  const handleLogin = (loginData) => {
    dispatch(login(loginData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleBlogSave = (blog) => {
    dispatch(createBlog(blog));
    toggleRef.current.toggleVisibility();
  };

  const handleLikeClick = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author} `)) {
      return;
    }
    dispatch(removeBlog(blog));
  };

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm handleLogin={handleLogin} />
        :
        <div >
          <h2>blogs</h2>
          <p>{`${user.name} logged in`} <button onClick={handleLogout}>logout</button></p>
          <Togglable visibleLabel='cancel' hideLabel='create new blog' ref={toggleRef}>
            <BlogForm handleSave={handleBlogSave} />
          </Togglable>
          <Blogs blogs={blogs}
            handleLikeClick={handleLikeClick}
            handleDelete={handleDelete}
            loggedUsername={user.username} /> {/* my backend doesn't return userid, so username is used instead to delete blog*/}
        </div>
      }
    </div >
  );
};

export default App;