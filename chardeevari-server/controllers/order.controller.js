const Order = require("../Models/OrderModel");


const createOrder = async (req, res) => {
    try {
      
      console.log(req.body);
      const { orderNumber, orderTime, totalAmount, status, products, addressId,receiversPhone } = req.body;
  
      const userId = req.userId;
  
      //get all the details of order and then save that in the order module
  
      const newOrder ={ userId , orderNumber, orderTime, totalAmount, status, products, addressId , receiversPhone};
      
      console.log(newOrder)

      const order = new Order(newOrder);

      const createdOrder = await order.save();
      

      res.status(201).json(createdOrder);
    } catch (error) {
      console.error("Error while creating order:", error);
      res.status(500).send("Error while creating order. Please try again later.");
    }
  };

const getOrder = async (req, res) => {
    try {
  
      const userId = req.userId;
      console.log(userId);

      const orders = await Order.find({userId:userId });

      console.log(orders);

      res.status(200).json(orders);
    } catch (error) {
      console.error("Error while fetching order:", error);
      res.status(500).send("Error while fetching order. Please try again later.");
    }
  };

  module.exports = { createOrder,getOrder };