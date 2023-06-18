const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const AddressTypeEnum = {
  billing: 0,
  shipping: 1,
};



const addressSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: uuid(),
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
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
  addressType: {
    type: Number,
    default: 1,
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: uuid(),
    },
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
    address: {
      type: [String],
      required: false,
    },
    cart: {
      type: [String],
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

//add billing and shipping address
//seperate order from user and also make it static in another table using the user id we will fetch the data
//also the cart data should be seperate
