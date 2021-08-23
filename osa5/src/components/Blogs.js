import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Blogs = ({ blogs, handleLikeClick, handleDelete, username }) => (
  blogs.map(blog =>
    <Blog key={blog.id}
      blog={blog}
      handleLikeClick={handleLikeClick}
      handleDelete={handleDelete}
      username={username} />
  )
)

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  })),
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

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
Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  }),
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}
export default Blogs