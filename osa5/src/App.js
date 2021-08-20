import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password });

    setUser(user);
    setUsername('');
    setPassword('');
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>Username: <input type='text' value={username} onChange={e => setUsername(e.target.value)} /></div>
        <div>Password: <input type='password' value={password} onChange={e => setPassword(e.target.value)} /></div>
        <div><button type='submit'>login</button></div>
      </form>
    </div>)

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>{`${user.name} logged in`}</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      {user === null ?
        loginForm() :
        blogList()
      }
    </div>
  )
}

export default App