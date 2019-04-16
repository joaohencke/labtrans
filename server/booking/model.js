const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    place: String,
    room: String,
    beginTs: Number,
    endTs: Number,
    responsible: String,
    description: String,
    people: Number,
  },
  { timestamps: true },
);

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = BookingModel;
