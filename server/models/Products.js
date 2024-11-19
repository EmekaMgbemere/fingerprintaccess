const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: mongoose.Schema.ObjectId, 
  productName: String,
  productDescription: String,
  productCategory: String,
  price: Number,
  productImages: String,
  stockAvailability: { type: Boolean, default: false },
  productReviews: String,
  avatar: String,
}, 
{
 modified_at:{type:Number,default:()=>Date.now()}
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
