const Cruise = require('../models/Cruise');
const asyncHandler = require('../utils/asyncHandler');

// Get all cruises
const getAllCruises = asyncHandler(async (req, res) => {
  const cruises = await Cruise.find();
  res.json(cruises);
});

// Get cruise by ID
const getCruiseById = asyncHandler(async (req, res) => {
  const cruise = await Cruise.findOne({ id: req.params.id });
  if (!cruise) {
    res.status(404);
    throw new Error('Cruise not found');
  }
  res.json(cruise);
});

// Create new cruise
const createCruise = asyncHandler(async (req, res) => {
  const newCruise = new Cruise(req.body);
  const savedCruise = await newCruise.save();
  res.status(201).json(savedCruise);
});

// Update cruise
const updateCruise = asyncHandler(async (req, res) => {
  const updatedCruise = await Cruise.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  if (!updatedCruise) {
    res.status(404);
    throw new Error('Cruise not found');
  }
  res.json(updatedCruise);
});

// Delete cruise
const deleteCruise = asyncHandler(async (req, res) => {
  const cruise = await Cruise.findOneAndDelete({ id: req.params.id });
  if (!cruise) {
    res.status(404);
    throw new Error('Cruise not found');
  }
  res.json({ message: 'Cruise deleted' });
});

module.exports = {
  getAllCruises,
  getCruiseById,
  createCruise,
  updateCruise,
  deleteCruise
};