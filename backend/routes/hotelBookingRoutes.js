const express = require('express');
const { createHotelBooking, getHotelBookings } = require('../controllers/hotelBookingController');

const router = express.Router();

router.post('/', createHotelBooking);
router.get('/', getHotelBookings);

module.exports = router;