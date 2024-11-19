const Products = require('../../server/models/Products');

const ProductRegistry = async (req, res) =>{
  const { productID, productCategory,avatar, productName, productDescription, price, productImages , stockAvailability, productReviews} = req.body;
    try{
      let product = await Products.findOne({productName});
      if(product){
        res.json("Products Already exists");
      }
      else{
            const avatar = gravatar.url(email, {
                s:'200',
                r: 'pg',
                d:'mm'
            });

            product = new Products({ productID, productCategory, avatar, productName, productDescription, price, productImages , stockAvailability, productReviews});
            await product.save();
            res.json(product);
            console.log(`Signup token: ${product}`)
    }
    
    } catch (err) {
      console.error(err.message)
      res.json('An error occurred');
    }
};

const ProductDisplay = async (req, res) => {
  Products.find()
  .then(product => res.json(product))
};

const ProductDelete = async (req, res) => {
    try {
      const productID = req.params.id;
      const productDelete = await Products.findByIdAndDelete(productID);
      
      if (!productDelete) {
        return res.status(404).json({ error: 'Products not found' });
      }
      
      res.json({ message: 'Products deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const ProductSearch = async (req, res) => {
    const productID = req.params.id;
  
    try {
      const product = await Products.findById(productID);
      if (!product) {
        return res.status(404).json({ error: 'Products not found' });
      }
      return res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
const ProductUpdate =  async (req, res) => {
   
      let product = await Products.updateOne(
        { _id : req.params.id}, 
        { $set: req.body  }
      )
     res.send({ result });
  };

  module.exports = { ProductRegistry, ProductDisplay, ProductDelete, ProductSearch, ProductUpdate }