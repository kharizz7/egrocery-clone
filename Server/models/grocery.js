const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  SKU: { type: String, required: true },
  dealerPrice: { type: Number, required: true },
  specialPrice: { type: Number },
  MRP: { type: Number, required: true },
  imageUrl: { type: String },
  inStock: { type: Boolean, default: true }
});

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  variants: [variantSchema]
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
