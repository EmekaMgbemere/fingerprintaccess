const mongoose = require("mongoose");

const customerSupportSchema = new mongoose.Schema({
  customerID: mongoose.Schema.ObjectId, 
  customerCareID: mongoose.Schema.ObjectId, 
  chatLog: String,
  refundRequest: String
}, 
{
 modified_at:{type:Number,default:()=>Date.now()}
}
);

const CustomerSupport = mongoose.model('CustomerSupport', customerSupportSchema);

module.exports = CustomerSupport;
