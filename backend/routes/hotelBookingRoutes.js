const express = require('express');
const { createHotelBooking, getHotelBookings, searchHotelBookings } = require('../controllers/hotelBookingController');

const router = express.Router();

router.post('/', createHotelBooking);
router.get('/', getHotelBookings);
router.get('/search', searchHotelBookings);

module.exports = router;