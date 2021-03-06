import React, { useState, useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, _setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null); //{message:string, isError:boolean}
  const toggleRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const userJson = window.localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const setBlogs = blogs => {
    const newArray = [...blogs];
    newArray.sort((elem1, elem2) => elem2.likes - elem1.likes);
    _setBlogs(newArray);
  };

  const showNotification = (message, isError) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 4000);
  };

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
      toggleRef.current.toggleVisibility();
    } catch (e) {
      showNotification(e.response.data.error, true);
    }
  };

  const handleLikeClick = async (likes, blogId) => {
    try {
      const updatedBlog = await blogService.addLikes(likes, blogId);
      setBlogs(blogs.map(b => b.id !== blogId ? b : { ...b, likes: updatedBlog.likes }));
      showNotification(`Liked ${updatedBlog.title}, it has now ${updatedBlog.likes} likes`);
    } catch (e) {
      showNotification(e.response.data.error, true);
    }
  };

  const handleDelete = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author} `)) {
      return;
    }
    try {
      await blogService.remove(blog.id);
      const filtered = blogs.filter(b => b.id !== blog.id);
      setBlogs(filtered);
      showNotification(`Blog ${blog.title} is removed`);
    } catch (e) {
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