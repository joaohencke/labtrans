const express = require('express');

const auth = require('../../auth');
const { validate } = require('../../utils/validation');
const bookingManager = require('../');

const writeRouter = express.Router({ mergeParams: true });

module.exports = writeRouter;

writeRouter.use(auth.authenticate());

const defaultBody = {
  description: 'string',
  beginTs: 'numeric',
  endTs: 'numeric',
  responsible: 'string',
  place: 'string',
  room: 'string',
  people: 'numeric?',
};

writeRouter.post('/', validate(defaultBody, 'body'), (req, res, next) => {
  bookingManager
    .create(req.validData)
    .then(result => res.status(201).json(result))
    .catch(next);
});

writeRouter.put('/:id', validate({ ...defaultBody, id: 'string' }), (req, res, next) => {
  bookingManager
    .update(req.validData)
    .then(result => res.json(result))
    .catch(next);
});

writeRouter.delete('/:id', validate({ id: 'string' }, 'params'), (req, res, next) => {
  bookingManager
    .remove(req.validData)
    .then(() => res.status(204).end())
    .catch(next);
});
