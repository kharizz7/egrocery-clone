const Grocery = require('../models/Grocery'); // Import the Grocery model

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


// GET /api/product/:productId
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

module.exports = { getProductsByCategory , getProductById};
