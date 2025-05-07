const express = require('express');
const router = express.Router();
const { getProductsByCategory,getProductById, getCategories,getStocksByCategory} = require('../controllers/productsController'); 

// Route for fetching products by category and ID
router.get('/:category', getProductsByCategory);
router.get('/product/:productId', getProductById);
router.get('/grocery', getCategories);
router.get("/stocks/:category", getStocksByCategory);
// router.get('/:category', productController.getProductsByCategory);

module.exports = router;
