import React, { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null); //{message, isError}

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, isError) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 4000);
  }

  const handleLogin = async (loginData) => {
    try {
      const user = await loginService.login(loginData);
      window.localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (e) {
      showNotification('wrong username or password', true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  };

  const handleBlogSave = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs([...blogs, newBlog]);
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    } catch (e) {
      debugger
      showNotification(e.response.data.error, true);
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        <LoginForm handleLogin={handleLogin} />
        :
        <div >
          <BlogForm handleSave={handleBlogSave} />
          <h2>blogs</h2>
          <p>{`${user.name} logged in`} <button onClick={handleLogout}>logout</button></p>
          <Blogs blogs={blogs} />
        </div>
      }
    </div >
  );
}

export default App;