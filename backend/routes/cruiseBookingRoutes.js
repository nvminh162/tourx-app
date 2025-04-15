const express = require('express');
const { createCruiseBooking, getCruiseBookings, searchCruiseBookings } = require('../controllers/cruiseBookingController');

const router = express.Router();

router.post('/', createCruiseBooking);
router.get('/', getCruiseBookings);
router.get('/search', searchCruiseBookings);

module.exports = router;