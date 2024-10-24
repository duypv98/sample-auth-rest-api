const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../db/models/User');
const { getCookieOptions } = require("../utils/cookie");

const { JWT_KEY, SALT } = process.env;

const register = async (req, res) => {
  const { username, email, password } = req.body;
  // Check if empty request body
  if (!req.body || !username || !password || !email) return res.status(400).json({ error: { message: 'Bad Request: empty data' } });
  // Check if username or email has been taken
  const exUser = await User.findOne().or([{ username }, { email }]);
  if (exUser) return res.status(409).json({ error: { message: 'Username or email exists' } });
  // Create new user
  const newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.password = crypto.pbkdf2Sync(password, SALT, 1000, 64, 'sha512').toString('hex'); // hashing password
  await newUser.save();
  return res.status(200).json({ data: { message: 'Success' } });
};

const login = async (req, res) => {
  const { username, password, redirectURI } = req.body;
  // Check if empty request body
  if (!req.body || !username || !password) return res.status(400).json({ error: { message: 'Bad Request: empty data' } });
  // Check login info
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: { message: 'Invalid Username' } });
  const isValidPassword = crypto.pbkdf2Sync(password, SALT, 1000, 64, 'sha512').toString('hex') === user.password;
  if (!isValidPassword) return res.status(401).json({ error: { message: 'Invalid Password' } });
  // Sign JWT and send it to Client
  const token = jwt.sign({ uid: user.get('_id') }, JWT_KEY, { expiresIn: '30m' });
  res.cookie("x-data-token", token, { ...getCookieOptions() });
  if (req.url === "/authorize") {
    if (!!redirectURI) {
      // TODO: Check redirect URI is valid
      res.redirect(redirectURI);
      return;
    }
    return res.status(200).json({ data: { token } });
  }
  return res.status(200).json({ data: { token } });
};

module.exports = {
  register,
  login
};
