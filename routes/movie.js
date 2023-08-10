const router = require('express').Router();
const { createMovieValidation, deleteMovieByIdValidation } = require('../utils/validation');
const { getMovies, createMovie, deleteMovieById } = require('../conrollers/movies');

router.get('/', getMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:movieId', deleteMovieByIdValidation, deleteMovieById);

module.exports = router;
