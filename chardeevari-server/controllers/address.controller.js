const jwt = require('jsonwebtoken');
const User = require("../Models/UserModel");

const createAddress = async (req, res) => {
  try {
    const { name, address, streetAddress, city, state, pincode, phone, addressType } = req.body;

    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {  
      return res.status(404).send("User not found");
    }

    const newAddress = {
      name,
      address,
      streetAddress,
      city,
      state,
      pincode,
      phone,
      addressType,
    };

    user.address.push(newAddress);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error while creating address:", error);
    res.status(500).send("Error while creating address. Please try again later.");
  }
};


const updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { name, address, streetAddress, city, state, pincode, phone, addressType } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let updatedAddress;
    if (addressType === AddressTypeEnum.billing) {
      user.billingAddress.name = name;
      user.billingAddress.address = address;
      user.billingAddress.streetAddress = streetAddress;
      user.billingAddress.city = city;
      user.billingAddress.state = state;
      user.billingAddress.pincode = pincode;
      user.billingAddress.phone = phone;

      updatedAddress = user.billingAddress;
    } else {
      const shippingAddressIndex = user.shippingAddresses.findIndex(address => address._id.toString() === addressId);
      if (shippingAddressIndex === -1) {
        return res.status(404).send("Address not found");
      }

      user.shippingAddresses[shippingAddressIndex].name = name;
      user.shippingAddresses[shippingAddressIndex].address = address;
      user.shippingAddresses[shippingAddressIndex].streetAddress = streetAddress;
      user.shippingAddresses[shippingAddressIndex].city = city;
      user.shippingAddresses[shippingAddressIndex].state = state;
      user.shippingAddresses[shippingAddressIndex].pincode = pincode;
      user.shippingAddresses[shippingAddressIndex].phone = phone;

      updatedAddress = user.shippingAddresses[shippingAddressIndex];
    }

    await user.save();

    res.status(200).json(updatedAddress);
  } catch (error) {
    console.error("Error while updating address:", error);
    res.status(500).send("Error while updating address. Please try again later.");
  }
};

const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const addresses = user.address; // Get all addresses from the user object

    if (addresses.length === 0) {
      return res.status(404).send("No addresses found");
    }
    console.log(addresses);

    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error while getting addresses:", error);
    res.status(500).send("Error while getting addresses. Please try again later.");
  }
};


const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (addressId === "billing") {
      user.billingAddress = null;
    } else {
      const shippingAddressIndex = user.shippingAddresses.findIndex(address => address._id.toString() === addressId);
      if (shippingAddressIndex === -1) {
        return res.status(404).send("Address not found");
      }

      user.shippingAddresses.splice(shippingAddressIndex, 1);
    }

    await user.save();

    res.status(200).send("Address deleted successfully");
  } catch (error) {
    console.error("Error while deleting address:", error);
    res.status(500).send("Error while deleting address. Please try again later.");
  }
};

module.exports = { deleteAddress,getAddress, createAddress,updateAddress };