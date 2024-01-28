const Joi = require('joi');
const { Segments } = require('celebrate');

const avatarUrlRegex = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)#?$/;

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().pattern(avatarUrlRegex).messages({
    'string.pattern.base': 'Некорректный URL аватара',
  }),
});

const userIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required()
      .messages({
        'string.hex': 'Некорректный ID пользователя',
        'string.length': 'Некорректный ID пользователя',
        'any.required': 'ID пользователя обязателен',
      }),
  }),
};

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
});

const updateAvatarSchema = Joi.object({
  avatar: Joi.string().pattern(avatarUrlRegex).required().messages({
    'string.pattern.base': 'Некорректный URL аватара',
    'any.required': 'URL аватара обязателен',
  }),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createCardSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  link: Joi.string().pattern(avatarUrlRegex).required(),
});

const cardIdSchema = {
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required()
      .messages({
        'string.hex': 'Некорректный ID карточки',
        'string.length': 'Некорректный ID карточки',
        'any.required': 'ID карточки обязателен',
      }),
  }),
};

module.exports = {
  createUserSchema,
  updateUserSchema,
  updateAvatarSchema,
  signInSchema,
  userIdSchema,
  createCardSchema,
  cardIdSchema,
};
