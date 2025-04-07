# TourX App Backend

## Overview
Backend service for the TourX application - a comprehensive tour booking platform specializing in cruise and hotel reservations. Built with Node.js, Express, and MongoDB.

### Complete Project Structure
```
backend/
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── app.js                  # Express application setup
├── package.json            # Project dependencies
├── README.md               # Project documentation
├── server.js               # Entry point for the server
├── config/
│   ├── config.js           # Configuration settings
│   └── db.js               # Database connection
├── controllers/
│   ├── cruiseController.js          # Cruise CRUD operations
│   ├── cruiseBookingController.js   # Cruise booking logic
│   ├── hotelController.js           # Hotel CRUD operations
│   ├── hotelBookingController.js    # Hotel booking logic
│   └── userController.js            # User authentication and management
├── middlewares/
│   └── errorHandler.js              # Error handling middleware
├── models/
│   ├── Cruise.js           # Cruise data model
│   ├── CruiseBooking.js    # Cruise booking data model
│   ├── Hotel.js            # Hotel data model
│   ├── HotelBooking.js     # Hotel booking data model
│   └── User.js             # User data model
├── routes/
│   ├── cruiseRoutes.js     # Routes for cruise operations
│   ├── cruiseBookingRoutes.js  # Routes for cruise booking
│   ├── hotelRoutes.js      # Routes for hotel operations
│   ├── hotelBookingRoutes.js   # Routes for hotel booking
│   └── userRoutes.js       # Routes for user operations
├── services/               # Business logic services
└── utils/                  # Utility functions
    └── asyncHandler.js     # Async error handler
```

## Features
- User authentication and management
- Comprehensive cruise management
- Hotel listing and details
- Booking system for both cruises and hotels
- RESTful API architecture

## Installation

1. Clone the repository:
```sh
git clone https://github.com/nvminh162/tourx-app.git
cd tourx-app/backend
```

2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

## Running the Server

To start the server in production mode:
```sh
npm start
```

For development with automatic restart:
```sh
npm run dev
```

## API Documentation

### User Management
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Delete user

### Cruises
- `GET /api/cruises` - Get all cruises
- `GET /api/cruises/:id` - Get cruise by ID
- `POST /api/cruises` - Create a new cruise
- `PUT /api/cruises/:id` - Update cruise by ID
- `DELETE /api/cruises/:id` - Delete cruise

### Cruise Bookings
- `POST /api/cruise-bookings` - Create a new cruise booking
- `GET /api/cruise-bookings` - Get all cruise bookings
- `GET /api/cruise-bookings/:id` - Get booking by ID
- `GET /api/cruise-bookings/user/:userId` - Get bookings by user

### Hotels
- `GET /api/hotel` - Get all hotels
- `GET /api/hotel/:id` - Get hotel by ID
- `POST /api/hotel` - Create a new hotel
- `PUT /api/hotel/:id` - Update hotel details
- `DELETE /api/hotel/:id` - Delete hotel

### Hotel Bookings
- `POST /api/hotel-bookings` - Create a new hotel booking
- `GET /api/hotel-bookings` - Get all hotel bookings
- `GET /api/hotel-bookings/:id` - Get booking by ID
- `GET /api/hotel-bookings/user/:userId` - Get bookings by user

## Error Handling
The API uses a consistent error response format:
```json
{
  "message": "Error message details",
  "stack": "Error stack trace (development mode only)"
}
```

## Database Models

### User Model
- fullname: String (required)
- username: String (required, unique)
- email: String (required, unique)
- password: String (required)

### Cruise Model
- name: String (required)
- location: String (required)
- price: Number (required)
- images: [String]
- details: Object
- rating: Object (score, count)
- amenities: [String]
- to: String (URL slug)

### Hotel Model
Similar structure to the Cruise model with hotel-specific attributes

## Technologies Used
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing
- **nodemon** - Development server with auto-restart

## License
Developed by Team #11 (2025-2026) - IUH.
@nvminh162