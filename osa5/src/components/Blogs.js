import React, { useState } from 'react'

const Blogs = ({ blogs }) => (
  blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )
)
const Blog = ({ blog }) => {
  const [view, setView] = useState(false);
  const toggleView = () => setView(!view);

  const buttonLabel = view ? 'hide' : 'view'
  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={toggleView}>{buttonLabel}</button>
      <div style={{ display: view ? '' : 'none' }} >
        <div>{blog.url}</div>
        <div>{blog.likes} <button>like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blogs