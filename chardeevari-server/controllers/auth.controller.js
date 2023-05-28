const User = require('../Models/UserModel');
const { upload } = require('../middlewares/multer');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const express = require('express');
require('dotenv').config()
const  cookieParser = require('cookie-parser')


const app = express();
app.use(cookieParser());

let secretToken = "";
const userLogin = async(req,res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(403).send("email id not registered");
    }

    if(!(email && password )){
        res.status(404).send("all fields are compulsary")
    }
    
    //match password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("password incorrect");
    try {
        //create token
        let data = {
            _id: user._id,
            phone: user.phone,
            // role:createdUser.role
        }

        const token = jwt.sign(data, process.env.TOKEN_SECRET, {
            expiresIn: '2h'
        })
        // secretToken = token;

        user.token =token;
        user.password =undefined;

        //cookie section
        const options = {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),    //after 7 days
            httpOnly:true
        };


        res.status(200).header("auth-token", token).cookie("token",token,options).json(user)

    } catch (error) {
      }
 }

  const userSignup = async (req, res) => {
    try {
      const user = new User(req.body);
      console.log('User: ', user);

        //check if all the values are present or not
        const {name,email,password,phone} = req.body
        if(!(name && email && password && phone)){
            res.status(404).send("all fields are compulsary")
        }

        //hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword

      //check if user already exists
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            res.status(405).send("Email already exists")
        }
        else {
            const createdUser = await user.save();

            let data = {
                _id: createdUser._id,
                phone: createdUser.phone,
                // role:createdUser.role
            }

            const token = jwt.sign(data, process.env.TOKEN_SECRET, {
                expiresIn: '2h'
            })
            secretToken = token;

            createdUser.token =token;
            createdUser.password =undefined;

            res.status(200).header("auth-token", token).json(createdUser);
        }
    } catch (error) {
      console.error('Error while saving user:', error);
      res.status(500).send('Error while saving user. Please try again later.');
    }
  };
  
 module.exports ={userSignup,userLogin}
 