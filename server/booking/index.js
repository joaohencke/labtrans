const Boom = require('boom');
const BookingModel = require('./model');

exports.list = async ({ page, limit = 20 } = {}) => {
  const query = BookingModel.find({});

  if (page !== undefined) {
    query.skip(page).limit((page + 1) * limit);
  }
  const [items, total] = await Promise.all([query.exec(), BookingModel.countDocuments({})]);

  return { items, total };
};

exports.get = ({ id }) => BookingModel.findById(id);

exports.create = async ({ description, beginTs, endTs, responsible, place, room, people } = {}) => {
  if (Number(beginTs) > Number(endTs)) throw Boom.badRequest('invalid_begin');

  const bookings = await BookingModel.find({
    place,
    room,
    $or: [
      {
        beginTs: {
          $gte: Number(beginTs),
          $lte: Number(endTs),
        },
      },
      {
        endTs: {
          $gte: Number(beginTs),
          $lte: Number(endTs),
        },
      },
    ],
  });

  if (bookings.length) throw Boom.badRequest('time_conflict');

  return BookingModel.create({ description, beginTs, endTs, responsible, place, room, people });
};
