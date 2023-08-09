const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const centralErrorHandler = require('./middlewares/central-error-handler');

require('dotenv').config();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();

app.disable('etag');

app.use(cors({
  origin: [
    'localhost:3000',
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

app.use(rateLimit({
  max: 100,
  windowMs: 15 * 60 * 100,
  message: { message: 'Too many requests from this IP' },
}));

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT);
