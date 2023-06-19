const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const cartItemSchema = new mongoose.Schema({
    // _id: {
    //   type: String,
    //   required: true,
    //   default: uuid(),
    // },
    product: {
      type: String,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  });
  
  const Cart = mongoose.model("Cart", cartItemSchema);
  
  module.exports = Cart;