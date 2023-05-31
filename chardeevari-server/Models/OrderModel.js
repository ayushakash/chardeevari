const mongoose = require('mongoose');
const productSchema = require('./productSchema');

const OrderStatusEnum = {
    PENDING: 0,
    PROCESSING: 1,
    COMPLETED: 2,
    CANCELLED: 3,
  };

const orderProductSchema = new mongoose.Schema({
    product: {
      type: productSchema,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  });


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
    products: {
      type: [orderProductSchema],
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });

  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;
