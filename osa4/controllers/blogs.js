const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

router.get('', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

router.post('', async (request, response) => {
  const { user } = request;
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const dbUser = await User.findOne({ username: user.username });
  const blog = new Blog({ ...request.body, user: dbUser._id });
  const savedBlog = await blog.save();
  dbUser.blogs = [...dbUser.blogs, savedBlog._id];
  await dbUser.save();
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
  const { user } = request;
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);
  if (blog) {
    const dbUser = await User.findOne({ username: user.username });
    if (dbUser._id.toString() !== blog.user._id.toString()) {
      return response.status(401).json({ error: 'unauthorized for delete' });
    }

    blog.delete();
    dbUser.blogs = dbUser.blogs.filter(id => id.toString() !== blog._id.toString());
    dbUser.save();
    return response.status(204).end();
  }
  response.status(404).end();
});

module.exports = router;