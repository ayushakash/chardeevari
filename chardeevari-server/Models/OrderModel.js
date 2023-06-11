const mongoose = require('mongoose');

const OrderStatusEnum = {
    PENDING: 0,
    PROCESSING: 1,
    INTRANSIT: 2,
    OUTFORDDELIVERY: 3,
    COMPLETED: 4,
    CANCELLED: 5,
  };

  const orderProductSchema = new mongoose.Schema({
    productId: {
      type: String,
      required: true,
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
    orderTime:{
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    // status: {
    //   type: String,
    //   enum: Object.values(OrderStatusEnum),
    //   default: OrderStatusEnum.PENDING,
    //   required: true,
    // },
    status: {
      type: Number,
      default: 0,
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
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiversPhone:{
      type:Number,
      required:true
    }
  });

  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;
