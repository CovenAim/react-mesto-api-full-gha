require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { errors: celebrateErrors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errors');
const config = require('./config');
const { CustomError } = require('./utils/CustomError');
const cors = require('./middlewares/cors');
const rootRouter = require('./routes/index');

const app = express();
const HTTP_NOT_FOUND = 404;

// Используем helmet
app.use(helmet());

// Используем cors
app.use(cors);

// Определение запросов лимитера
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // максимальное количество запросов за указанный период
  message: 'Too many requests from this IP, please try again later.',
});

// Подключение к MongoDB
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Подключение установлено');
  })
  .catch((err) => {
    console.error('Ошибка подключения:', err.message);
  });

app.use(express.json());

// Добавляем лимитер
app.use(limiter);

app.use(requestLogger);

// rootRouter
app.use('/', rootRouter);
app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

// Обработка случая, когда маршрут не найден
app.use('*', (req, res, next) => {
  const notFoundError = new CustomError('Страница не найдена', HTTP_NOT_FOUND);
  next(notFoundError);
});

const { PORT } = config;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
