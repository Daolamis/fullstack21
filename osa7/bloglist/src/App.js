import React, { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Blogs from './components/Blogs';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
import User from './components/User';
import { initBlogs, createBlog } from './reducers/blogs';
import { initUser, login } from './reducers/user';
import { initUsers } from './reducers/users';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const toggleRef = useRef();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUser());
    dispatch(initUsers());
  }, []);

  const handleLogin = (loginData) => {
    dispatch(login(loginData));
  };

  const handleBlogSave = (blog) => {
    dispatch(createBlog(blog));
    toggleRef.current.toggleVisibility();
  };

  return (
    <div>
      <Notification />
      <Navigation/>
      {user === null ?
        <LoginForm handleLogin={handleLogin} />
        :
        <div>
          <h2>blogs</h2>
        </div>
      }
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/'>
          {user &&
            <div>
              <Togglable visibleLabel='cancel' hideLabel='create new blog' ref={toggleRef}>
                <BlogForm handleSave={handleBlogSave} />
              </Togglable>
              <Blogs/>
            </div>
          }
        </Route>
      </Switch>
    </div>
  );
};

export default App;