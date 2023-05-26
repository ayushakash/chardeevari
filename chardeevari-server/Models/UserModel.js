const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
});

const productSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderNumber: String,
  totalAmount: Number,
  status: String,
  products: [productSchema]
});

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  phone:String,
  address: [addressSchema],
  cart: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number
    }
  ],
  orders: [orderSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
