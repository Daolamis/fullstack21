const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.get('', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  res.json(users);
});

router.post('', async (req, res) => {
  const { body: newUser } = req;
  if (!newUser.password || newUser.password.length < 3) {
    const err = new Error('Password is too short! Minimum length of password is 3 characters.');
    err.name = 'ValidationError';
    throw err;
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(newUser.password, saltRounds);
  const user = new User({ ...newUser, password: hash });
  const ret = await user.save();
  res.status(201).json(ret);
});

module.exports = router;