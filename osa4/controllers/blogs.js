const router = require('express').Router();
const Blog = require('../models/blog');

router.get('', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post('', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
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