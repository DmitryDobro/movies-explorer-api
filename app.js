const express = require('express');
const mongoose = require('mongoose');

const router = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(router);
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.use(errorLogger);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на стороне сервера' : message });
  next();
});
app.listen(3001, () => {
  console.log(3001);
});
