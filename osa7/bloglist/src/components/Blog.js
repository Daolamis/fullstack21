import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blogs';
import CommentForm from './CommentForm';

const Blog = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch('/blogs/:id');
  const blog = useSelector(state => state.blogs.find(b => b.id === match.params.id));
  const user = useSelector(state => state.user);
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

      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        <span data-testid='likes'>{blog.likes}</span>
        <button onClick={() => handleLikeClick(blog)}>like</button></div>
      <div>{blog.user.name}</div>
      {user && user.username === blog.user.username &&
        <div><button className='delete_button' onClick={() => handleDelete(blog)}>Remove</button></div>}

      <h4>Comments</h4>
      <CommentForm blogId={blog.id} />
      <ul>
        {blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
      </ul>
    </div>
  );
};


export default Blog;