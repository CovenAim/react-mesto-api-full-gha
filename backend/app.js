require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { errors: celebrateErrors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errors');
const config = require('./config');
const NotFoundError = require('./utils/NotFoundError');
const rootRouter = require('./routes/index');

const app = express();

// Используем helmet
app.use(helmet());

// Используем cors
app.use(cors());

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

// rootRouter
app.use('/', rootRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Обработка случая, когда маршрут не найден
app.use('*', (req, res, next) => {
  console.error(`Запрошен несуществующий маршрут: ${req.path}`);
  next(new NotFoundError('Страница не найдена'));
});

app.use(requestLogger);
app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

const { PORT } = config;

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
