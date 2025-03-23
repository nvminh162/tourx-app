const Hotel = require('../models/Hotel');
const asyncHandler = require('../utils/asyncHandler');

// Get all hotels
const getAllHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

// Get hotel by ID
const getHotelById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }
  res.json(hotel);
});

// Create new hotel
const createHotel = asyncHandler(async (req, res) => {
  const newHotel = new Hotel(req.body);
  const savedHotel = await newHotel.save();
  res.status(201).json(savedHotel);
});

// Update hotel
const updateHotel = asyncHandler(async (req, res) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedHotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }
  res.json(updatedHotel);
});

// Delete hotel
const deleteHotel = asyncHandler(async (req, res) => {
  const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!deletedHotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }
  res.json({ message: 'Hotel deleted successfully' });
});

module.exports = {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel
};