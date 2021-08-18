const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.get('', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post('', async (req, res) => {
  const { body: newUser } = req;
  console.log('newUser', newUser);
  const saltRounds = 10;
  const hash = await bcrypt.hash(newUser.password, saltRounds);
  const user = new User({ ...newUser, password: hash });
  const ret = await user.save();
  res.status(201).json(ret);
});

module.exports = router;