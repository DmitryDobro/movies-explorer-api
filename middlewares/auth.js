const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.cookie;
    // const token = req.headers.authorization;
    if (!token) {
      throw new AuthError('Необходима авторизация');
    }
    const validToken = token.replace('jwt=', '');
    payload = jwt.verify(validToken, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    console.log(req.user);
    next();
  } catch (error) {
    if (error.message === 'NotAuthorization') {
      next(new AuthError('Необходима авторизация'));
    } else {
      next(error);
    }
  }
};
module.exports = auth;
