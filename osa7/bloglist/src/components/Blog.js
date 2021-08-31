import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blogs';

const Blog = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/blogs/:id');
  const blog = useSelector(state => state.blogs.find(b => b.id === match.params.id));
  const loggedUsername = useSelector(state => state.user.username);
  const history = useHistory();

  const handleLikeClick = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author} `)) {
      return;
    }
    dispatch(removeBlog(blog));
    history.push('/');
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h3>{blog.title} {blog.author}</h3>

      <div>{blog.url}</div>
      <div>
        <span data-testid='likes'>{blog.likes}</span>
        <button onClick={() => handleLikeClick(blog)}>like</button></div>
      <div>{blog.user.name}</div>
      {loggedUsername === blog.user.username &&
        <div><button className='delete_button' onClick={() => handleDelete(blog)}>Remove</button></div>}
    </div>
  );
};


export default Blog;