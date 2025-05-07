const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create a schema for the User
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false // can auto-generate if needed
  },
  username: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true,
    match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
  },
  mobile: {
    type: String,
    match: /^[0-9]{10}$/, // Accepts 10-digit phone numbers
  },
  
  password: { 
    type: String, 
    required: true 
  },
  confirmPassword: { 
    type: String // still optional, handled in controller
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hashing before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password compare method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Connect to 'webuser' collection
const User = mongoose.model('User', userSchema);

module.exports = User;
