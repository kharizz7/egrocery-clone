const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user (with validation)
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Request Body (Register):', req.body); // Log incoming request data

  try {
    // Basic validation
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user without validation (you can add password hashing here)
    const user = new User({ username, email, password });

    // Save the user to the database
    await user.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login a user with JWT token generation
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Request Body (Login):', req.body); // Log incoming request data

  try {
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password matches (ensure `matchPassword` method exists on User model)
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });

    // Send a success response with token
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Mobile Number
const updateMobileNumber = async (req, res) => {
  const { email, mobile } = req.body;

  console.log("📞 Mobile Update Request:", req.body); // Log the input

  try {
    // Basic validation
    if (!mobile || !email) {
      return res.status(400).json({ message: 'Email and mobile number are required' });
    }

    // Find user by email and update the mobile number
    const user = await User.findOneAndUpdate(
      { email },
      { mobile },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Mobile number updated successfully', user });
  } catch (error) {
    console.error('Error updating mobile number:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get current user based on the JWT token (user ID is attached via middleware)
const getCurrentUser = async (req, res) => {
  try {
    // Ensure the user is authenticated and `req.user` contains the user data
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, updateMobileNumber, getCurrentUser };
