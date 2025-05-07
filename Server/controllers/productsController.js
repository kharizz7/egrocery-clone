const Grocery = require('../models/grocery'); 
// Fetch products by category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Grocery.find({ category: category });

    if (!products.length) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// 
const Stock = require("../models/grocery");

// Controller to fetch stocks by category
const getStocksByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const stocks = await Stock.find({ category });
    if (stocks.length === 0) {
      return res.status(404).json({ message: "No stocks found in this category" });
    }
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stocks" });
  }
};



// Fetch product by ID
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Grocery.aggregate([
      {
        $group: {
          _id: "$category", // Group by category
          products: { $push: "$$ROOT" } // Push all products in that category into the 'products' array
        }
      }
    ]);

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};



module.exports = { getProductsByCategory , getProductById, getCategories ,getStocksByCategory};
