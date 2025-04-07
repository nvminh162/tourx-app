const mongoose = require('mongoose');

const HotelBookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  roomType: { type: String, required: true },
  hotelName: { type: String, required: true },
  hotelLocation: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  stayDuration: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('HotelBooking', HotelBookingSchema);