const userRouter = require('express').Router();
const { getUserInfo, uppdateUser } = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', uppdateUser);
module.exports = userRouter;
