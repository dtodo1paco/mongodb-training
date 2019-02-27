const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MODEL_NAME = "product"; // Mongoose will look for collection with plural of this

let ProductSchema = new Schema({
  name: {type: String, required: true, max: 100},
  price: {type: Number, required: true},
});

const model = mongoose.model(MODEL_NAME, CustomerSchema);

// Export the model
module.exports = {
  model: mongoose.model(MODEL_NAME),
  toJSON
};