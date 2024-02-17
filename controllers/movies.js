const Movie = require('../model/Movie');
const NotFoundError = require('../errors/NotFoundErrors');
const ValidationError = require('../errors/ValidationError');

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
    const selectMovie = await Movie.findByIdAndDelete(req.params.movieId).orFail(
      new NotFoundError('Фильм по данному ID не найдена'),
    );
    res.status(200).send(selectMovie);
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
