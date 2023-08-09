const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CREATED_CODE } = require('../utils/constants');
const ConflictError = require('../errors/conflict-error');
const IncorrectRequestError = require('../errors/incorrect-request-error');
const NotFoundError = require('../errors/not-found-error');

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
        next(new ConflictError('Пользователь с такой почтой уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectRequestError('Переданы некорректные данные для cоздания пользователя'));
      } else {
        next(err);
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
        maxAge: 3600000 * 60 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      }).send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  return User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new IncorrectRequestError('Переданы некорректные данные для обновления пользователя'));
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
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequestError('Переданы некорректные данные для поиска пользователя'));
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
