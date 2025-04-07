const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Route imports
const cruiseRoutes = require('./routes/cruiseRoutes');
const hotelRoutes = require('./routes/hotelRoutes'); 
const userRoutes = require('./routes/userRoutes');
const hotelBookingRoutes = require('./routes/hotelBookingRoutes');
const cruiseBookingRoutes = require('./routes/cruiseBookingRoutes'); // Make sure this is imported

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API test route
app.get('/', (req, res) => {
  res.send('API @nvminh162 is running...');
});

// Routes
app.use('/api/cruises', cruiseRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hotel-bookings', hotelBookingRoutes);
app.use('/api/cruise-bookings', cruiseBookingRoutes); // Make sure this is mounted

// Error handling middleware
app.use(errorHandler);

module.exports = app;