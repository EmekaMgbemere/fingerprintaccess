const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MockApiSchema = new Schema({
  id: String, 
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  gender: { type: String },
  avatar: String
});

const Mockapi = mongoose.model('Mockapi', MockApiSchema);

module.exports = Mockapi;