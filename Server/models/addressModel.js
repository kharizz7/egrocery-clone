const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  houseStreet: {
    type: String,
    required: true
  },
  areaCity: {
    type: String,
    required: true
  },
  landmark: {
    type: String
  },
  state: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);


module.exports = Address;
