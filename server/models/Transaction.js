const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  productID: mongoose.Schema.ObjectId, 
  orderNumber: Number,
  orderDate: new Date(),
  orderTime: new Date(),
  orderStatus: { type: Boolean, default: false },
  paymentConfirmation: { type: Boolean, default: false },
  stockAvailability: { type: Boolean, default: false },
  invoiceDetails: String,
  shippingTracking : String,
}, 
{
 modified_at:{type:Number,default:()=>Date.now()}
}
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
