const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');
const { JWT_SECRET } = require('../config');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.replace('Bearer ', '')
    : null;

  console.log('Received token:', token);

  if (!token) {
    return next(new UnauthorizedError('Требуется авторизация'));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError('Неверный токен'));
  }
};

module.exports = auth;
