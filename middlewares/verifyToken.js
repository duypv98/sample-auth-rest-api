const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: { message: 'Unauthorized' } });
  // Get token from request authorization header: (Authorization: Bearer <token>)
  const token = authHeader.split(' ')[1];
  // Verify token and get uid - user_id from token
  jwt.verify(token, JWT_KEY, (err, payload) => {
    if (err) res.status(403).json({ error: { message: 'Token Expired or Invalid Token' } });
    req.uid = payload.uid;
  });
  return next();
};
