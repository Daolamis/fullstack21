const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  const { body: loginData } = req;
  const user = await User.findOne({ username: loginData.username });
  const passwordCorrect = !!user
    && await bcrypt.compare(loginData.password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: 'invalid username or password' });
  }

  const tokenData = {
    username: user.username,
    name: user.name
  };

  const token = jwt.sign(tokenData, process.env.SECRET);
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;