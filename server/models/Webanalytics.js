const mongoose = require("mongoose");

const webAnalyticsSchema = new mongoose.Schema({
  productID: mongoose.Schema.ObjectId, 
  clicks: Number,
  MostViewedPage: Number,
  popularProducts: String,
}, 
{
 modified_at:{type:Number,default:()=>Date.now()}
}
);

const WebAnalytics = mongoose.model('WebAnalytics', webAnalyticsSchema);

module.exports = WebAnalytics;
