const express = require('express');
const { registerUser, loginUser, updateMobileNumber,getCurrentUser } = require('../controllers/userControllers');
const authMiddleware = require("../middleware/Authmiddle");


const router = express.Router();

// User registration route
router.post('/register', (req, res, next) => {
  console.log('Register Route Hit:', req.body); // Log incoming request
  next();
}, registerUser);

// User login route
router.post('/login', (req, res, next) => {
  console.log('Login Route Hit:', req.body); // Log incoming request
  next();
}, loginUser);

router.put('/mobile/', (req, res, next) => {
    console.log('Login Route Hit:', req.body); // Log incoming request router.put("/user/mobile", updateMobileNumber);

    next();
  }, updateMobileNumber);

// middleware

// Secure routes using the authMiddleware
router.get("/me", authMiddleware, getCurrentUser); 

module.exports = router;
