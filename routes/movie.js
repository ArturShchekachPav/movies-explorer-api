const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getMovies, createMovie, deleteMovieById } = require('../conrollers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({

  }),
}), createMovie);

router.delete('/:id', deleteMovieById);

module.exports = router;
