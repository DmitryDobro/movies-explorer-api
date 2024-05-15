const userRouter = require('express').Router();
const { getUserInfo, uppdateUser } = require('../controllers/users');
const { validateUpdateateUser } = require('../utils/validator');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUpdateateUser, uppdateUser);
module.exports = userRouter;
