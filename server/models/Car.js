const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  sellerId: String, 
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  bodyType: String,
  engineType: String,
  transmission: String,
  fuelType: String,
  bodyColor: String,
  customsPaper: String,
  sellerName: String,
  sellerLocation: String,
  sellercontactInfo: String,
  frontView: String,
  frontseatView: String,
  backseatView: String,
  engineView: String,
  state: String,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;