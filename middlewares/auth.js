const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { tokenNotFoundMessage, incorrectTokenMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError(tokenNotFoundMessage));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new AuthError(incorrectTokenMessage));
    console.log(token);
  }

  req.user = payload;

  next();
};
