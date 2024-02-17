const Movie = require('../model/Movie');
const NotFoundError = require('../errors/NotFoundErrors');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(200).send(movies);
  } catch (error) {
    next(error);
  }
};
const createMovie = async (req, res, next) => {
  try {
    const {
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail,
    } = req.body;
    const owner = req.user._id;
    const newCard = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      owner,
    });
    res.status(201).send(newCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Пераданы не валидные данные'));
    } else {
      next(error);
    }
  }
};
const deleteMovie = async (req, res, next) => {
  try {
    console.log(req.params.movieId);
    const selectMovie = await Movie.findById(req.params.movieId).orFail(
      new NotFoundError('Карточка по данному ID не найдена'),
    );
    if (selectMovie.owner.toString() === req.user._id) {
      const movie = await Movie.findByIdAndDelete(req.params.movieId);
      res.status(200).send(movie);
    } else {
      next(new ForbiddenError('Не являетесь владельцем карточи'));
    }
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ValidationError('Передан не корректный ID'));
    } else {
      next(error);
    }
  }
};
module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
