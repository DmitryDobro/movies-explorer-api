const movieRouter = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateMovieId } = require('../utils/validator');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateCreateMovie, createMovie);
movieRouter.delete('/:movieId', deleteMovie);
module.exports = movieRouter;
