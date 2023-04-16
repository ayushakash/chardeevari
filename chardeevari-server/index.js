const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const multer = require('multer');

const Product = require('../chardeevari-server/Models/productSchema'); // or import Product from './models/product';
const cors = require('cors');


// Import the Product schema

const app = express();
app.use(cors());
app.use(express.json())

app.use('/uploads', express.static('uploads'))

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
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // path where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split('/')[1]) // file name
  }
})


// Create a new product
// app.post('/api/products', async (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//   try {
//     // Create a new Product object using the request body
//     const product = new Product(req.body);
//     res.json(req.body)

//     // Save the new product to the database
//     // await product.save();

//     // // Return a success message with the new product object
//     // res.status(201).json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

const upload = multer({ storage: storage })

app.post('/api/products', upload.single('image'), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    res.json(req.body)
    const product = new Product(req.body);
    product.image = req.file.filename

    console.log("Product: ", product)

    await product.save();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
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
