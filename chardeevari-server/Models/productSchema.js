const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
    // unique: true,
  },
  productName: {
    type: String,
    required: false,
  },
  productSku: {
    type: String,
    required: false,
  },
  productPrice: {
    type: Number,
    required: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  inventoryCount: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  }
  
});

module.exports = mongoose.model('Product', productSchema);
