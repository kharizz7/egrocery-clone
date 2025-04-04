// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import routes
const groceryRoutes = require('./routes/groceryRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize Express
const app = express();

// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from your React frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register routes
app.use('/api', groceryRoutes);


app.use('/api', userRoutes);      // User routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
