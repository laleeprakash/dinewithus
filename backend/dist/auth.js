
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send({ error: 'Invalid token.' });
  }
};

module.exports = { authenticateToken };
