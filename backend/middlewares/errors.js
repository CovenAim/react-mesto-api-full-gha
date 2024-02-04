const http2 = require('http2');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const UnauthorizedError = require('../utils/UnauthorizedError');
const ForbiddenError = require('../utils/ForbiddenErrors');

const MONGO_DUPLICATE_ERROR_CODE = 11000;

// eslint-disable-next-line consistent-return, no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Обработка ошибок валидации Joi
  if (err && err.isJoi) {
    return res.status(400).json({
      message: 'Ошибка валидации данных',
      errors: err.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      })),
    });
  }

  // Обработка ошибки дублирования email
  if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
    return res
      .status(http2.constants.HTTP_STATUS_CONFLICT)
      .json({ message: 'Этот email уже используется' });
  }

  // Обработка неверного токена
  if (err.name === 'JsonWebTokenError') {
    return res
      .status(http2.constants.HTTP_STATUS_UNAUTHORIZED)
      .json({ message: 'Некорректный токен' });
  }

  // Обработка кастомных ошибок
  if (err instanceof BadRequestError) {
    return res.status(err.status || 500).json({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res
      .status(err.status || http2.constants.HTTP_STATUS_NOT_FOUND)
      .json({ message: err.message });
  }
  if (err instanceof UnauthorizedError) {
    console.log('Ошибка Unauthorized', err);
    return res.status(err.status || 500).json({ message: err.message });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.status || 500).json({ message: err.message });
  }

  // По умолчанию возвращаем 500 ошибку
  res
    .status(500)
    .json({ message: err.message || 'На сервере произошла ошибка' });
};

module.exports = errorHandler;
