const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create a schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/  // Email format validation
  },
  password: { type: String, required: true },
  confirmPassword: { type: String } // This can be handled at the controller level, not in the schema
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password hasn't been modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create a model based on the schema, targeting the 'webuser' collection
const User = mongoose.model('User', userSchema, 'webuser');

module.exports = User;
