const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CREATED_CODE, authSuccessMessage, dublicateEmailErrorMessage, incorrectRequestErrorMessage,
  userNotFoundMessage, registerErrorMessage, updateUserErrorMessage
} = require('../utils/constants');
const ConflictError = require('../errors/conflict-error');
const IncorrectRequestError = require('../errors/incorrect-request-error');
const NotFoundError = require('../errors/not-found-error');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((newUser) => User.findById(newUser._id)
      .then((user) => res.status(CREATED_CODE).send(user)))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(dublicateEmailErrorMessage));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectRequestError(incorrectRequestErrorMessage));
      } else {
        next(new AuthError(registerErrorMessage));
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: false,
        secure: true,
        sameSite: 'None',
      }).send({ message: authSuccessMessage });
    })
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  return User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(dublicateEmailErrorMessage));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectRequestError(updateUserErrorMessage));
      } else {
        next(err);
      }
    });
};

const getUserData = (req, res, next) => {
  const _id = req.user;

  return User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundMessage);
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequestError(incorrectRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  updateUserData,
  getUserData,
};
