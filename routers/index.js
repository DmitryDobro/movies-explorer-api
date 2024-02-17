const router = require('express').Router();
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateUserAuth } = require('../utils/validator');
const NotFoundError = require('../errors/NotFoundErrors');

router.post('/signin', validateUserAuth, login);
router.post('/signup', validateCreateUser, createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));
module.exports = router;
