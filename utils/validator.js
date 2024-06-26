const { celebrate, Joi } = require('celebrate');

const regex = /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?/;
// валидация создания пользователя
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),

  }),
});
// валидация авторизации
const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
// валидация изменения информации о пользователя
const validateUpdateateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
});
// валидация создания фильма
const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().min(2).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(regex),
    trailerLink: Joi.string().pattern(regex),
    nameRU: Joi.string().min(2).required(),
    nameEN: Joi.string().min(2).required(),
    thumbnail: Joi.string().pattern(regex),
    movieId: Joi.number().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateCreateUser,
  validateUserAuth,
  validateCreateMovie,
  validateUpdateateUser,
  validateMovieId,
};
