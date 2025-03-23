const express = require('express');
const router = express.Router();
const {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/hotelController');

router.route('/')
  .get(getAllHotels)
  .post(createHotel);

router.route('/:id')
  .get(getHotelById)
  .put(updateHotel)
  .delete(deleteHotel);

module.exports = router;