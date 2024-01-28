// eslint-disable-next-line func-names, consistent-return
module.exports = function (req, res, next) {
  const allowedCors = [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://mestofan.nomoredomainsmonster.ru',
    'https://api.mestofan.nomoredomainsmonster.ru',
    'http://mestofan.nomoredomainsmonster.ru',
    'http://api.mestofan.nomoredomainsmonster.ru',
    'http://localhost:3000/users/me',
    'http://localhost:3000/cards',
  ];

  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
};
