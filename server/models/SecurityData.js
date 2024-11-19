const mongoose = require("mongoose");

const securityDataSchema = new mongoose.Schema({
  ipAddress: mongoose.Schema.ObjectId, 
  browserinfo: String,
  deviceInformation: String,

}, 
{
 modified_at:{type:Number,default:()=>Date.now()}
}
);

const securityData = mongoose.model('securityData', securityDataSchema);

module.exports = securityData;
