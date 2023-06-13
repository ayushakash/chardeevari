const express = require('express');
const {authenticateToken} = require('../middlewares/authentication')

const router = express.Router();
const { createOrder,updateOrder,getOrder } = require('../controllers/order.controller');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.post("/", authenticateToken, createOrder);
// router.put("/:addressId", authenticateToken, updateOrder);
// router.delete("/:addressId", authenticateToken, deleteAddress);
router.get("/", authenticateToken, getOrder);


module.exports = router;
  