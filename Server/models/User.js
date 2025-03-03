const mongoose = require('mongoose');

// Create a schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String } // ✅ Remove `required: true`
});


// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
