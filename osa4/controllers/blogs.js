const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

router.post('', async (request, response) => {
  const [user] = await User.find({}); //first found user
  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();
  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();
  response.status(201).json(savedBlog);
});

router.put('/:id', async (request, response) => {
  const { body, params: { id } } = request;
  const result = await Blog.findByIdAndUpdate(id, body, { new: true });
  if (result) {
    response.json(result);
  } else {
    response.status(404).end();
  }
});

router.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id);
  if (result) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

module.exports = router;