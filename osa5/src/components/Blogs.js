import React, { useState } from 'react'

const Blogs = ({ blogs, handleLikeClick, handleDelete, username }) => (
  blogs.map(blog =>
    <Blog key={blog.id}
      blog={blog}
      handleLikeClick={handleLikeClick}
      handleDelete={handleDelete}
      username={username} />
  )
)
const Blog = ({ blog, handleLikeClick, handleDelete, username }) => {
  const [view, setView] = useState(false);
  const toggleView = () => setView(!view);

  const buttonLabel = view ? 'hide' : 'view'
  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={toggleView}>{buttonLabel}</button>
      <div style={{ display: view ? '' : 'none' }} >
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={() => handleLikeClick(blog.likes + 1, blog.id)}>like</button></div>
        <div>{blog.user.name}</div>
        {username === blog.user.username &&
          <div><button className='delete_button' onClick={() => handleDelete(blog)}>Remove</button></div>}
      </div>
    </div>
  )
}

export default Blogs