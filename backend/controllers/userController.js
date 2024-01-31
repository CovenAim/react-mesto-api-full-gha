const mongoose = require('mongoose');
const http2 = require('http2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const UnauthorizedError = require('../utils/UnauthorizedError');
const { CustomError } = require('../utils/CustomError');
const { JWT_SECRET } = require('../config');

// Получение всех пользователей
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(http2.constants.HTTP_STATUS_OK).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    let userId;
    console.log('req.user', req.params.user);
    if (req.params.userId) {
      userId = req.params.userId;
    } else if (req.user) {
      userId = req.user._id;
    }
    console.log('userId', userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError('Некорректный ID пользователя');
    }
    const user = await User.findById(userId).orFail(new NotFoundError('Пользователь не найден'));

    res.status(http2.constants.HTTP_STATUS_OK).json(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(201).json({
      email: newUser.email,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
    });
  } catch (err) {
    next(err);
  }
};

// Исправление с учетом нового модуля CustomError
exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true },
    ).orFail(new CustomError('Запрашиваемый пользователь не найден', 404));

    res.status(http2.constants.HTTP_STATUS_OK).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Обновление аватара пользователя
exports.updateAvatar = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true },
    ).orFail(new CustomError('Запрашиваемый пользователь не найден', 404));

    res.status(http2.constants.HTTP_STATUS_OK).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неверные почта или пароль');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Неверные почта или пароль');
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(http2.constants.HTTP_STATUS_OK).send({
      data: { email: user.email, id: user._id },
      token,
      message: 'Аутентификация прошла успешно',
    });
  } catch (err) {
    next(err);
  }
};
