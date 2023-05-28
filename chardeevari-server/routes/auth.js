const express = require('express');
const router = express.Router();
const { userSignup,userLogin } = require('../controllers/auth.controller');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.post('/login', userLogin)
router.post('/signup', userSignup)

module.exports = router;
 