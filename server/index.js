const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./__config');
const apis = require('./_apis');
const { handler } = require('./utils/error');

mongoose.connect(config.db, { config: { autoIndex: true }, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => {
  throw new Error(`unable to connect to database at ${config.db}`);
});

const app = express();

app.use(helmet());
app.use(
  express.json({
    limit: '10mb',
    type: 'application/json',
  }),
);

app.use(cors('http://localhost:3000'));

if (config.dev) {
  app.use(morgan('dev'));
}

Object.keys(apis).forEach(api => {
  console.log(api);
  app.use(`/api/${api}`, apis[api]);
});

// error handling
app.use((err, req, res, next) => handler(res, err));

app.use('/', express.static(`${__dirname}/public`));
app.use('/static/css', express.static(`${__dirname}/public/static/css`));
app.use('/static/js', express.static(`${__dirname}/public/static/js`));

app.all('/*', (req, res) => {
  res
    .status(200)
    .set({
      'content-type': 'text/html; charset=utf-8',
    })
    .sendFile(`${__dirname}/public/index.html`);
});

app.listen(config.port, () => console.log(`express listening on port ${config.port}`));

module.exports = app;
