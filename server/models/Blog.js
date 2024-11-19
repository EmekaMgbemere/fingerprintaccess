
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  customerID: mongoose.Schema.ObjectId, 
  BlogID: mongoose.Schema.ObjectId, 
  BlogImage: mongoose.Schema.ObjectId, 
  BlogViews: Number, 
  BlogPostImage: String, 
  BlogTitle: String,
  BlogAuthor: String,
  BlogCategory: String,
  BlogMessage: String,
}, 
{
 modified_at:{type:Number,default:()=>Date.now()}
}
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
