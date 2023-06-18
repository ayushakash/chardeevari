const express = require('express');
const {authenticateToken} = require('../middlewares/authentication')

const router = express.Router();
const { createMerchant,getMerchant } = require('../controllers/merchant.controller');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.post("/", authenticateToken, createMerchant);
// router.put("/:addressId", authenticateToken, updateAddress);
// router.delete("/:addressId", authenticateToken, deleteAddress);
router.get("/", authenticateToken, getMerchant);


module.exports = router;  
 