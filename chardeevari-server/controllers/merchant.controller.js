const jwt = require('jsonwebtoken');
const Merchant = require("../Models/MerchantSchema");

const createMerchant = async (req, res) => {
    try {
      const userId = req.userId;    // Assume you have obtained the user ID from the request
  
      let newMerchant = new Merchant(req.body);
      newMerchant.userId = userId;
  
      let registeredMerchant = await newMerchant.save();
      console.log("Registered merchant:", registeredMerchant);
  
      res.status(201).json(registeredMerchant);
    } catch (error) {
      console.error("Error while creating merchant:", error);
      res.status(500).send("Error while creating merchant. Please try again later.");
    }
  };

  const getMerchant = async (req, res) => {
    try {
      const userId = req.userId;   
      console.log(userId);       //get the user id and search for merchant with the user id 
  
      let merchant = await Merchant.find({ userId: userId })
      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }
  
      res.status(200).json(merchant);
    } catch (error) {
      console.error("Error while retrieving merchant:", error);
      res.status(500).send("Error while retrieving merchant. Please try again later.");
    }
  };

  module.exports = {getMerchant,createMerchant}