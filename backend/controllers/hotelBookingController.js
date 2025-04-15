const HotelBooking = require('../models/HotelBooking');

// Create a new hotel booking
exports.createHotelBooking = async(req, res) => {
    try {
        console.log('Received hotel booking data:', req.body);

        const booking = await HotelBooking.create(req.body);
        console.log('Hotel booking created successfully:', booking);

        res.status(201).json({
            success: true,
            message: 'Đặt phòng thành công!',
            booking
        });
    } catch (error) {
        console.error('Error creating hotel booking:', error);
        res.status(400).json({
            success: false,
            message: 'Lỗi khi đặt phòng',
            error: error.message
        });
    }
};

// Get all hotel bookings
exports.getHotelBookings = async(req, res) => {
    try {
        console.log('Fetching all hotel bookings...');
        const bookings = await HotelBooking.find().sort('-createdAt');
        console.log(`Found ${bookings.length} hotel bookings`);

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching hotel bookings:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search hotel bookings by email, phone, or ID
exports.searchHotelBookings = async(req, res) => {
    try {
        const { field, query } = req.query;
        console.log(`Searching hotel bookings with ${field}=${query}`);

        if (!field || !query) {
            return res.status(400).json({
                success: false,
                message: 'Missing search field or query'
            });
        }

        let filter = {};

        if (field === 'email') {
            filter.email = { $regex: query, $options: 'i' }; // Case-insensitive search
        } else if (field === 'phone') {
            filter.phone = { $regex: query, $options: 'i' };
        } else if (field === 'id') {
            // For searching by ID
            try {
                filter._id = query;
            } catch (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid ID format'
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid search field'
            });
        }

        const bookings = await HotelBooking.find(filter).sort('-createdAt');
        console.log(`Found ${bookings.length} hotel bookings matching the criteria`);

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Error searching hotel bookings:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};