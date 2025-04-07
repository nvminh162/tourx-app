const CruiseBooking = require('../models/CruiseBooking');

// Create a new cruise booking
exports.createCruiseBooking = async (req, res) => {
  try {
    console.log('Received cruise booking data:', req.body);
    
    const booking = await CruiseBooking.create(req.body);
    console.log('Cruise booking created successfully:', booking);
    
    res.status(201).json({
      success: true,
      message: 'Đặt du thuyền thành công!',
      booking
    });
  } catch (error) {
    console.error('Error creating cruise booking:', error);
    res.status(400).json({
      success: false,
      message: 'Lỗi khi đặt du thuyền',
      error: error.message
    });
  }
};

// Get all cruise bookings
exports.getCruiseBookings = async (req, res) => {
  try {
    const bookings = await CruiseBooking.find().sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};