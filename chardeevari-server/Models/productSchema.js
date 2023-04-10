const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productSku: {
    type: String,
    required: true,
    unique: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  inventoryCount: {
    type: Number,
    required: true,
  },
  images: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Product', productSchema);
