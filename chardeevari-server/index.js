const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('../chardeevari-server/Models/productSchema'); // or import Product from './models/product';
const cors = require('cors');


// Import the Product schema

const app = express();
app.use(cors());
console.log(process.env.MONGO_URI);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

// Parse incoming JSON requests
app.use(express.json());

// Create a new product
app.post('/addproducts', async (req, res) => {
  try {
    console.log(req.body)
    // Create a new Product object using the request body
    const product = new Product(req.body);

    // Save the new product to the database
    await product.save();

    // Return a success message with the new product object
    res.status(201).json(product);
  } catch (error) {
    // Return an error message if there was a problem creating the product
    res.status(400).json({ error: error.message });
  }
});

app.get('/products', async (req, res) => {

  try {
    const products = await Product.find();
    res.send(products);
    res.status(200)

  }
  catch {

  }
})

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});



// sampleData
