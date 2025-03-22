const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    details: {
        rooms: { type: Number, required: true }
    },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: {
        score: { type: Number, required: true },
        count: { type: Number, required: true }
    },
    image: { type: String, required: true },
    images: [{ type: String, required: true }],
    to: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', HotelSchema);
