const express = require('express');
const { createCruiseBooking, getCruiseBookings } = require('../controllers/cruiseBookingController');

const router = express.Router();

router.post('/', createCruiseBooking);
router.get('/', getCruiseBookings);

module.exports = router;