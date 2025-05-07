const express = require('express');
const router = express.Router();
const {
  getAllAddresses,
  createAddress
} = require('../controllers/addressController');

// GET all addresses
router.get('/', getAllAddresses);

// POST new address
router.post('/', createAddress);

module.exports = router;
