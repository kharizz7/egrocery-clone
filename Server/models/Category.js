const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grocery',  // Reference to the Grocery model
  }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
