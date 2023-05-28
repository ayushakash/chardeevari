const mongoose = require('mongoose');
const OrderStatusEnum = {
  PENDING: 0,
  PROCESSING: 1,
  COMPLETED: 2,
  CANCELLED: 3,
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
  street: {
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
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
});


// const productSchema = new mongoose.Schema({
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   }
// });

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatusEnum),
    default: OrderStatusEnum.PENDING,
    required: true,
  },
  products: {type:[cartItemSchema],
  require:false}
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

  address: {
    type: [addressSchema],
    required: false,
  },
  cart:{ 
    type:[cartItemSchema],
    require:false,
  },
  orders: {
    type: [orderSchema],
    required: false,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
