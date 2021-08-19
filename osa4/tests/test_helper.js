const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

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

const usersInDB = async () => {
  const users = await User.find({});
  return users.map(b => b.toJSON());
};

const createToken = (user) => {
  const tokenData = {
    username: user.username,
    name: user.name
  };

  return jwt.sign(tokenData, process.env.SECRET);
};

module.exports = { blogsInDB, nonExistingBlogId, usersInDB, createToken };