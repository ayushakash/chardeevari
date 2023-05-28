const Product = require('../Models/productSchema');
const { upload } = require('../middlewares/multer');


const getAllProducts = async(req,res) =>{
    try {
        const products = await Product.find();
        res.send(products);
        res.status(200);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
 }

 const createProduct = async (req, res) => {

    try {
      const product = new Product(req.body);
      product.image = req.file.filename;
  
      console.log('Product: ', product);
  
      await product.save();
      res.status(200).send('Product created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };

 module.exports ={getAllProducts,createProduct}
 