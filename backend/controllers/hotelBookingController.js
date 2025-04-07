const HotelBooking = require('../models/HotelBooking');

// Create a new hotel booking
exports.createHotelBooking = async (req, res) => {
  try {
    console.log('Received booking data:', req.body);
    
    const booking = await HotelBooking.create(req.body);
    console.log('Booking created successfully:', booking);
    
    res.status(201).json({
      success: true,
      message: 'Đặt phòng thành công!',
      booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({
      success: false,
      message: 'Lỗi khi đặt phòng',
      error: error.message
    });
  }
};

// Get all hotel bookings
exports.getHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find();
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