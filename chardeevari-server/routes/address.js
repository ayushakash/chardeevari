const express = require('express');
const router = express.Router();
const { createAddress,updateAddress,getAddress,deleteAddress } = require('../controllers/address.controller');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.post("/:id", createAddress);
router.put("/:id/:addressId", updateAddress);      //send 2 id from here
router.delete("/:id", deleteAddress);
router.get("/:id", getAddress);

module.exports = router;
 