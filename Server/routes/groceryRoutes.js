const express = require('express');
const router = express.Router();
const { getProductsByCategory,getProductById } = require('../controllers/groceryController'); // Import the controller

// Route for fetching products by category
router.get('/grocery/:category', getProductsByCategory);
router.get('/product/:productId', getProductById);

module.exports = router;
