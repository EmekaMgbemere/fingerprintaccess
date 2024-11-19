const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phoneNumber: String,
  password: String,
  secretCode:String
}, 
{
 modified_at:{type:Number,default:()=>Date.now()}
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
