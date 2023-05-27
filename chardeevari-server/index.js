const { connectMongoDb } = require('./connection');
const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/product');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
connectMongoDb(process.env.MONGO_URI).then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error) => {
    console.log('Database connection failed. Exiting now...');
    console.error(error);
    process.exit(1);
  });


// Routes
app.use('/products', productRouter);


// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
