const Address = require('../models/addressModel');

// Get all addresses
const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find().sort({ createdAt: -1 });
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Server error while fetching addresses' });
  }
};

// Create a new address
const createAddress = async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(400).json({ error: 'Invalid address data' });
  }
};

module.exports = {
  getAllAddresses,
  createAddress
};
