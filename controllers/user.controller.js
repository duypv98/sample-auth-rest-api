const User = require('../db/models/User');

const getUserInfo = async (req, res) => {
  const { uid } = req;
  const { username, email } = await User.findOne({ _id: uid });
  return res.status(200).json({ data: { username, email } });
};

module.exports = { getUserInfo };
