const movieRouter = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const auth = require('../middlewares/auth');

movieRouter.get('/', auth, getMovies);
movieRouter.post('/', auth, createMovie);
movieRouter.delete('/:movieId', auth, deleteMovie);
module.exports = movieRouter;
