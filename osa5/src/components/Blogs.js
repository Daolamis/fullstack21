import React from 'react'

const Blogs = ({ blogs }) => (
  blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )
)
const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blogs