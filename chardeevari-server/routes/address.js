const express = require('express');
const {authenticateToken} = require('../middlewares/authentication')

const router = express.Router();
const { createAddress,updateAddress,getAddress,deleteAddress } = require('../controllers/address.controller');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.post("/", authenticateToken, createAddress);
router.put("/:addressId", authenticateToken, updateAddress);
router.delete("/:addressId", authenticateToken, deleteAddress);
router.get("/", authenticateToken, getAddress);


module.exports = router;  
 