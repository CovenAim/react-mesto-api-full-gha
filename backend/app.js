const express = require('express');
require('dotenv').config();

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors: celebrateErrors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rootRouter = require('./routes/index');
const errorHandler = require('./middlewares/errors');
const config = require('./config');
const cors = require('./middlewares/cors');
const { CustomError } = require('./utils/CustomError');

const app = express();
const HTTP_NOT_FOUND = 404;

// Используем helmet
app.use(helmet());

// Определение запросов лимитера
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
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
app.use(cors);

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
