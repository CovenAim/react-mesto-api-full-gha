require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret',
  PORT: process.env.PORT || 3000,
};
