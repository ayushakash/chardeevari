const express = require('express');
const {authenticateToken} = require('../middlewares/authentication')

const router = express.Router();
const { addToCart,getCartItems,removeFromCart } = require('../controllers/cart.controller');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.post("/", authenticateToken, addToCart);
router.get("/", authenticateToken, getCartItems);
router.delete("/:productId", authenticateToken, removeFromCart);


module.exports = router;  
 