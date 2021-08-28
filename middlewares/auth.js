const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-err');
// const JWT_SECRET = process.env.JWT_SECRET;
const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   throw new AuthorizationError();
  // }

  // const token = authorization.replace('Bearer ', '');
  const token = req.cookies.jwt;

  let payload;

  try {
    // payload = jwt.verify(token, 'some-secret-key');
    // payload = jwt.verify(token, JWT_SECRET);
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // console.log(payload)
  } catch (err) {
    throw new (AuthorizationError('Необходима авторизация.'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  // console.log(req.user._id)

  next(); // пропускаем запрос дальше
};
