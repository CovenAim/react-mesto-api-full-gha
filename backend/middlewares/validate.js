const { BadRequestError } = require('./errors');

// eslint-disable-next-line consistent-return
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next(new BadRequestError(error.details[0].message));
  }
  next();
};

module.exports = validate;
