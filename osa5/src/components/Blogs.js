import React, { useState } from 'react'

const Blogs = ({ blogs, handleLikeClick }) => (
  blogs.map(blog =>
    <Blog key={blog.id} blog={blog} handleLikeClick={handleLikeClick} />
  )
)
const Blog = ({ blog, handleLikeClick }) => {
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
      </div>
    </div>
  )
}

export default Blogs