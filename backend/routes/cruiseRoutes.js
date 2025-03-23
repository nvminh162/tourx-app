const express = require('express');
const router = express.Router();
const {
  getAllCruises,
  getCruiseById,
  createCruise,
  updateCruise,
  deleteCruise
} = require('../controllers/cruiseController');

router.route('/')
  .get(getAllCruises)
  .post(createCruise);

router.route('/:id')
  .get(getCruiseById)
  .put(updateCruise)
  .delete(deleteCruise);

module.exports = router;