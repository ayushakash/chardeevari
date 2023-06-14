const User = require("../Models/UserModel");
const { upload } = require("../middlewares/multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

const userLogin = async (req, res) => {
  console.log("Entering login")
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log("User: ", user);

  if (!user) {
    res.status(403).send("Email ID not registered");
  }

  if (!(email && password)) {
    res.status(400).send("All fields are compulsory");
  }

  // Match password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Password incorrect");

  try {
    // Create token
    let data = {
      _id: user._id,
      phone: user.phone,
      // role:createdUser.role
    };

    console.log(data);
    const token = jwt.sign(JSON.stringify(data), process.env.TOKEN_SECRET);

    console.log("TOKEN", token);
    user.token = token;
    user.password = undefined;

    // Set the header and cookie
    res
      .status(200)
      .header("auth-token", token)
      .cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // After 7 days
        httpOnly: true,
      })
      .json(user);
  } catch (error) {
    console.error(error);
  }
};

const userSignup = async (req, res) => {
  console.log(req.body);
  try {
    const user = new User(req.body);
    // console.log("User: ", user);

    //check if all the values are present or not
    const { name, email, password, phone } = req.body;
    if (!(name && email && password && phone)) {
      res.status(404).send("All fields are compulsory");
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;

    console.log("User: ", user);

    //check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(405).send("Email already exists");
    } else {
      const createdUser = await user.save();

      let data = {
        _id: createdUser._id,
        phone: createdUser.phone,
        // role:createdUser.role
      };

      const token = jwt.sign(data, process.env.TOKEN_SECRET);
      secretToken = token;

      createdUser.token = token;
      createdUser.password = undefined;

      res
        .status(200)
        .header("auth-token", token)
        .cookie("token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // After 7 days
          httpOnly: true,
        })
        .json(createdUser);
    }
  } catch (error) {
    console.error("Error while saving user:", error);
    res.status(500).send("Error while saving user. Please try again later.");
  }
};

// const userSignup = async (req, res) => {

const userLogout = async (req, res) => {
  // Clear the session
  req.session.destroy();

  // Clear the auth-token header
  res.set('auth-token', '');

  // Clear the token cookie
  res.clearCookie('token');

  // Send a success response
  res.status(200).send('Logged out successfully');
};

module.exports = { userSignup, userLogin,userLogout };
