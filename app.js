require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandle = require('./middlewares/errorsHandlers');

// const { PORT, DB_ADRESS } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
  {
    origin: ['http://localhost:5173', 'https://bitfilmsdb.nomoredomainswork.ru/signin', 'http://bitfilmsdb.nomoredomainswork.ru/signin'],
    credentials: true,
  },

));
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(router);
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.use(errorLogger);
app.use(errors());

app.use(errorsHandle);
app.listen(3000, () => {
  console.log(3001);
});
