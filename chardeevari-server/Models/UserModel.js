const mongoose = require('mongoose');
const AddressTypeEnum = {
  billing: 0,
  shipping: 1,
};


const cartItemSchema = new mongoose.Schema({
  _id: false,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});


const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address:{
    type:String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  addressType:{
    type: String,
    enum: Object.values(AddressTypeEnum),
    default: AddressTypeEnum.shipping,
    required: true,
  }
});


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gstNumber: {
    type: String,
    required: false,
  },
  billingAddress: {
    type: addressSchema,
    required: false,
  },
    shippingAddress: {
    type: addressSchema,
    required: false,
  },
  cart: {
    type: [cartItemSchema],
    require: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

//add billing and shipping address
//seperate order from user and also make it static in another table using the user id we will fetch the data
//also the cart data should be seperate