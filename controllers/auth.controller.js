const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../db/models/User');

const { JWT_KEY, SALT } = process.env;

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const exUser = await User.findOne().or([{ username }, { email }]);
  if (exUser) return res.status(409).json({ error: { message: 'Username or email exists' } });
  const newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.password = crypto.pbkdf2Sync(password, SALT, 1000, 64, 'sha512').toString('hex');
  await newUser.save();
  return res.status(200).json({ data: { message: 'Success' } });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: { message: 'Invalid Username' } });
  const isValidPassword = crypto.pbkdf2Sync(password, SALT, 1000, 64, 'sha512').toString('hex') === user.password;
  if (!isValidPassword) return res.status(401).json({ error: { message: 'Invalid Password' } });
  const token = jwt.sign({ uid: user.get('_id') }, JWT_KEY, { expiresIn: '5m' });
  return res.status(200).json({ data: { token } });
};

module.exports = {
  register,
  login
};
