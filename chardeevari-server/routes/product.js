const express = require('express');
const router = express.Router();
const { getAllProducts,createProduct } = require('../controllers/product');
const { upload } = require('../middlewares/multer');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define routes
router.post('/', upload.single('image'), createProduct).get('/', getAllProducts);

module.exports = router;
 