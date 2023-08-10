const Movie = require('../models/movie');
const {
  CREATED_CODE, incorrectRequestErrorMessage, movieNotFoundMessage, noAccessErrorMessage,
} = require('../utils/constants');
const IncorrectRequestError = require('../errors/incorrect-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send(movies))
  .catch(next);

const createMovie = (req, res, next) => {
  const _id = req.user;

  return Movie.create({ ...req.body, owner: _id })
    .then((newMovie) => res.status(CREATED_CODE).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectRequestError(incorrectRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFoundMessage);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(noAccessErrorMessage);
      }

      return Movie.findByIdAndDelete(movieId).then((deletedMovie) => res.send(deletedMovie));
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
  getMovies,
  createMovie,
  deleteMovieById,
};
