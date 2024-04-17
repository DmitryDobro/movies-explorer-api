require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const cors = require('cors');
const router = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'https://dobryi.nomoredomainsmonster.ru', 'https://api.dobryi.nomoredomainsmonster.ru', 'http://dobryi.nomoredomainsmonster.ru', 'http://api.dobryi.nomoredomainsmonster.ru', 'https://api.dobryi.nomoredomainsmonster.ru/signin'],
  credentials: true,
}));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервth сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на стороне сервера' : message });
  next();
});

app.listen(PORT, () => {
  console.log(PORT);
});
