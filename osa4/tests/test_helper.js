const Blog = require('../models/blog');

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map(b => b.toJSON());
};

const nonExistingBlogId = async () => {
  const blog = new Blog({ author: 'A', title: 'the', likes: 1, url: 'www.fi' });
  const result = await blog.save();
  await Blog.findByIdAndRemove(result._id);
  return result._id;
};

module.exports = { blogsInDB, nonExistingBlogId };