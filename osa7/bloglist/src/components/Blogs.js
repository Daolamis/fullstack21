import React from 'react';
import { useSelector } from 'react-redux';
import { StyledLink as Link } from './components.styled';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);
  return (
    <div>
      {blogs.map(blog =>
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>);
};

export default Blogs;