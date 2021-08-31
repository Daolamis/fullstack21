import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector(state => state.blogs);
  return (
    <div>
      {blogs.map(blog =>
        <div className='blog' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </div>);
};

export default Blogs;