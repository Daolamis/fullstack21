import React, { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import { useDispatch, useSelector } from 'react-redux';

import { setNotification } from './reducers/notification';
import { initBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogs';

const App = () => {
  const blogs = useSelector(state => state.blogs);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const toggleRef = useRef();

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const user = await loginService.login(loginData);
      window.localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (e) {
      dispatch(setNotification('wrong username or password', true));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  };

  const handleBlogSave = async (blog) => {
    dispatch(createBlog(blog));
    toggleRef.current.toggleVisibility();
  };

  const handleLikeClick = async (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = async (blog) => {
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