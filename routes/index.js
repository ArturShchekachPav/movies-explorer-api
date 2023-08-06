const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const { createUser, login } = require('../conrollers/users')

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), login);

router.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', auth, userRoutes);

router.use('/movies', auth, movieRoutes);

router.use('*', auth, (req, res, next) => next(new NotFoundError('Некорректный путь запроса')));

module.exports = router;
