import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blogs = ({ blogs, handleLikeClick, handleDelete, loggedUsername }) => (
  blogs.map(blog =>
    <Blog key={blog.id}
      blog={blog}
      handleLikeClick={handleLikeClick}
      handleDelete={handleDelete}
      loggedUsername={loggedUsername} />
  )
);

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  })),
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loggedUsername: PropTypes.string.isRequired
};

const Blog = ({ blog, handleLikeClick, handleDelete, loggedUsername }) => {
  const [view, setView] = useState(false);
  const toggleView = () => setView(!view);

  const buttonLabel = view ? 'hide' : 'view';
  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={toggleView}>{buttonLabel}</button>
      <div className='more_blog_data' style={{ display: view ? 'block' : 'none' }} >
        <div>{blog.url}</div>
        <div><span data-testid='likes'>{blog.likes}</span> <button onClick={() => handleLikeClick(blog.likes + 1, blog.id)}>like</button></div>
        <div>{blog.user.name}</div>
        {loggedUsername === blog.user.username &&
          <div><button className='delete_button' onClick={() => handleDelete(blog)}>Remove</button></div>}
      </div>
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  }),
  handleLikeClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loggedUsername: PropTypes.string.isRequired
};
export default Blogs;
export { Blog }; // for testing