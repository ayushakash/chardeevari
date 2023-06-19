const Cart = require("../Models/cartModel");
const Product = require("../Models/productSchema");

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;    
    const { product, quantity } = req.body;
    let cartItem = await Cart.findOne({ product, userId });
    if (quantity === 0) {
        if (!cartItem) {
          return res.status(404).json({ message: "Cart item not found" });
        }
  
        // If quantity is 0 and cart item exists, remove it from the database
        await Cart.deleteOne({ _id: cartItem._id });
        return res.status(200).json({ message: "Cart item removed successfully" });
      }
    
    if (cartItem) {
      cartItem.quantity = quantity;
    } else {
        cartItem = new Cart({ userId, product, quantity });
    }

    const savedCartItem = await cartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error("Error while adding to cart:", error);
    res.status(500).send("Error while adding to cart. Please try again later.");
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    console.log(productId);

    const deletedItem = await Cart.deleteOne({userId:userId ,product:productId });
    console.log(deletedItem)

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    
    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    console.error("Error while removing cart item:", error);
    res.status(500).send("Error while removing cart item. Please try again later.");
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;   
    const cartItems = await Cart.find({ userId }).populate("product");
    if(cartItems.length>0 ){
        res.status(200).json(cartItems);
    }
    else{
        res.status(200).json({messege:"no items in the cart"});
    }

  } catch (error) {
    console.error("Error while retrieving cart items:", error);
    res.status(500).send("Error while retrieving cart items. Please try again later.");
  }
};

module.exports = { addToCart, removeFromCart, getCartItems };
