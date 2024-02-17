require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_ADRESS } = process.env;
const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(router);
mongoose.connect(DB_ADRESS);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на стороне сервера' : message });
  next();
});
app.listen(PORT, () => {
  console.log(PORT, DB_ADRESS);
});
