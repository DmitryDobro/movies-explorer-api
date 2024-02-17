const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const NotFoundError = require('../errors/NotFoundErrors');
const ValidationError = require('../errors/ValidationError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').orFail(() => new AuthError('Неправильные почта или пароль'));
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        // process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true }).send({ user });
      // console.log(token);
      // res.status(200).send({ token });
    } else {
      throw new AuthError('Неправильные почта или пароль');
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, password, email,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, email, password: hashPassword,
    });
    res.status(201).send(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Пераданы не валидные данные'));
    } else if (error.code === 11000) {
      next(new ConflictError('Пользовательс с такой почтой уже существут'));
    } else {
      next(error);
    }
  }
};
const getUserInfo = async (req, res, next) => {
  try {
    const users = await User.findById(req.user._id).orFail(() => new NotFoundError('Польователь по данному ID не найден'));
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};
const uppdateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newUserData = await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true }).orFail(() => new NotFoundError('Польователь по данному ID не найден'));
    res.status(200).send(newUserData);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Пераданы не валидные данные'));
    } else {
      next(error);
    }
  }
};
module.exports = {
  createUser,
  login,
  getUserInfo,
  uppdateUser,
};
