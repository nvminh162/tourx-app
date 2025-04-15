const CruiseBooking = require('../models/CruiseBooking');

// Create a new cruise booking
exports.createCruiseBooking = async(req, res) => {
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
exports.getCruiseBookings = async(req, res) => {
    try {
        console.log('Fetching all cruise bookings...');
        const bookings = await CruiseBooking.find().sort('-createdAt');
        console.log(`Found ${bookings.length} cruise bookings`);

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching cruise bookings:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Search cruise bookings by email, phone, or ID
exports.searchCruiseBookings = async(req, res) => {
    try {
        const { field, query } = req.query;
        console.log(`Searching cruise bookings with ${field}=${query}`);

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

        const bookings = await CruiseBooking.find(filter).sort('-createdAt');
        console.log(`Found ${bookings.length} cruise bookings matching the criteria`);

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Error searching cruise bookings:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};