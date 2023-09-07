const router = require('express').Router();
const { createUserValidation, loginValidation } = require('../utils/validation');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const { createUser, login } = require('../conrollers/users');

router.post('/signup', createUserValidation, createUser);

router.post('/signin', loginValidation, login);

router.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', auth, userRoutes);

router.use('/movies', auth, movieRoutes);

router.use('*', auth, (req, res, next) => next(new NotFoundError('Некорректный путь запроса')));

module.exports = router;
