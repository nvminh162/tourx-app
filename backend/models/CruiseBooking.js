const mongoose = require('mongoose');

const CruiseBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  cruiseName: { type: String, required: true },
  cruiseLocation: { type: String, required: true },
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CruiseBooking', CruiseBookingSchema);