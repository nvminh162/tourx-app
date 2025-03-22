require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("@nvminh162 - MongoDB Connected"))
        .catch((err) => console.error(err));

// API test
app.get("/", (req, res) => {
  res.send("API @nvminh162 is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cruiseRoutes = require('./routes/cruiseRoutes');
app.use('/api/cruises', cruiseRoutes);

const hotelRoutes = require('./routes/hotelRoutes');
app.use('/api/hotel', hotelRoutes);