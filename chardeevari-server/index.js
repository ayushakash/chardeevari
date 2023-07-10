const { connectMongoDb } = require('./connection');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const productRouter = require('./routes/product');
const authRouter = require('./routes/auth');
const addressRouter = require('./routes/address');
const orderRouter = require('./routes/order');
const merchantRouter = require('./routes/merchant');
const cartRouter = require('./routes/cart');
const { buildSchema } = require('graphql');
const  schema  = require('./Models/graphqlSchema/productGraph');
// const  root  = require('./graphql/mutation');

require('dotenv').config();
const  cookieParser = require('cookie-parser')

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, auth-token");
  res.setHeader("Access-Control-Expose-Headers", "auth-token");
  next();
});

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
app.use('/auth', authRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);
app.use('/merchant', merchantRouter);
app.use('/cart', cartRouter);
app.use('/graphql',graphqlHTTP({schema: schema, graphiql: true,}));


// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
