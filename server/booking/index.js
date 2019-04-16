const Boom = require('boom');
const BookingModel = require('./model');

/**
 * List bookings
 * @param {Object} query
 * @param {Number} query.page Page 0 - (n -1)
 * @param {Number} query.limit Limit
 */
exports.list = async ({ page, limit = 20 } = {}) => {
  const query = BookingModel.find({});

  if (page !== undefined) {
    query.skip(page).limit((page + 1) * limit);
  }
  const [items, total] = await Promise.all([query.exec(), BookingModel.countDocuments({})]);

  return { items, total };
};

/**
 * Find a bookings by it's id
 * @param {Object} param
 * @param {Object} param.id booking id
 * @returns {Promise<Object>} stored booking if exists
 */
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

/**
 * Create a new Booking
 * @param {Object} booking
 * @param {String} booking.description
 * @param {Number} booking.beginTs
 * @param {Number} booking.endTs
 * @param {String} booking.responsible
 * @param {String} booking.place
 * @param {String} booking.room
 * @param {Number} booking.people
 *
 * @returns {Promise<Object>} created booking
 * @throws {Error} invalid_begin
 * @throws {Error} time_conflict
 */
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

/**
 * Update a new Booking
 * @param {Object} booking
 * @param {ObjectId} booking.id
 * @param {String} booking.description
 * @param {Number} booking.beginTs
 * @param {Number} booking.endTs
 * @param {String} booking.responsible
 * @param {String} booking.place
 * @param {String} booking.room
 * @param {Number} booking.people
 *
 * @returns {Promise<Object>} updated booking
 * @throws {Error} invalid_begin
 * @throws {Error} time_conflict
 */
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

/**
 * Delete a bookings by it's id
 * @param {Object} param
 * @param {Object} param.id booking id
 * @returns {Promise<Booking>} deleted booking if exists
 */
exports.remove = ({ id }) => BookingModel.findByIdAndRemove(id);
