const express = require('express');
const router = express.Router();
const { userSignup,userLogin,userLogout } = require('../controllers/auth.controller');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.post('/login', userLogin)
router.post('/signup', userSignup)
router.get('/logout', userLogout)

module.exports = router;
 