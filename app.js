const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const centralErrorHandler = require('./middlewares/central-error-handler');
const { DEV_DB_URL } = require('./utils/config');

require('dotenv').config();

const { PORT = 3000, DB_URL = DEV_DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.disable('etag');

app.use(cors({
  origin: [
    'http://localhost:3005',
    'http://localhost:3000',
    'https://bestmoviesearcher.nomoredomainsicu.ru/',
    'http://bestmoviesearcher.nomoredomainsicu.ru/'
  ],
  credentials: true,
}));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'img-src': ['*'],
    },
  },
}));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(requestLogger);

// app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT);
