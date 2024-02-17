const router = require('express').Router();
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
module.exports = router;
