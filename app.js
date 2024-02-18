require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandle = require('./middlewares/errorsHandlers');

const { PORT, DB_ADRESS } = process.env;
const app = express();
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(router);
mongoose.connect(DB_ADRESS);
app.use(errorLogger);
app.use(errors());

app.use(errorsHandle);
app.listen(PORT, () => {
  console.log(PORT);
});
