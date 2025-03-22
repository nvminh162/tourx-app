const mongoose = require('mongoose');

const CruiseSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true, default: 'cruise' },
    details: {
        launchYear: { type: Number, required: true },
        material: { type: String, required: true },
        rooms: { type: Number, required: true }
    },
    originalPrice: { type: Number, default: null },
    price: { type: Number, required: true },
    rating: {
        score: { type: Number, required: true },
        count: { type: Number, required: true }
    },
    amenities: [{ type: String }],
    image: { type: String, required: true },
    images: [{ type: String }],
    to: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Cruise', CruiseSchema);
