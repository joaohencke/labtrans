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

async function hasConflict({ place, room, beginTs, endTs, id }) {
  const query = {
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
  };

  if (id) query._id = { $ne: id }; // eslint-disable-line

  const bookings = await BookingModel.countDocuments(query);

  return bookings > 0;
}

exports.create = async ({ description, beginTs, endTs, responsible, place, room, people } = {}) => {
  if (Number(beginTs) > Number(endTs)) throw Boom.badRequest('invalid_begin');

  const conflict = await hasConflict({ beginTs, endTs, place, room });

  if (conflict) throw Boom.badRequest('time_conflict');

  return BookingModel.create({
    description,
    responsible,
    place,
    room,
    people,
    beginTs,
    endTs,
  });
};

exports.update = async ({ id, description, beginTs, endTs, responsible, place, room, people } = {}) => {
  if (Number(beginTs) > Number(endTs)) throw Boom.badRequest('invalid_begin');

  const conflict = await hasConflict({ id, beginTs, endTs, place, room });

  if (conflict) throw Boom.badRequest('time_conflict');

  return BookingModel.findByIdAndUpdate(
    id,
    {
      $set: {
        description,
        beginTs,
        endTs,
        responsible,
        place,
        room,
        people,
      },
    },
    { new: true },
  );
};

exports.remove = ({ id }) => BookingModel.findByIdAndRemove(id);
