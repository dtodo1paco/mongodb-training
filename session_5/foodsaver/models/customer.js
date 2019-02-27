'use strict';
// import the necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypter = require('../util/crypto');
const MODEL_NAME = "customer"; // Mongoose will look for collection with plural of this

const CustomerSchema = new Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  location_id: Number,
  enabled: Boolean,
  meta: {
    birthday: Date,
    website: String,
    likes: [{
      type: String
    }],
    company: String,
  },
  created_at: Date,
  updated_at: Date,
});
/**
 * Before saving, we need to complete some data
 */
CustomerSchema.pre('save', function(next) {
  const now = new Date();
  this.updated_at = now;
  if (!this.created_at) { // new element
    this.created_at = now;
    this.password = crypter.encrypt(this.password);
  }
  this.enabled = true;
  next(); // Continue saving process. Otherwise it will hang
})
const model = mongoose.model(MODEL_NAME, CustomerSchema);
function toJSON(obj) {
  return  {
    id: obj._id,
    username: obj.username,
    birthday: obj.birthday,
  }
}
module.exports = {
  model: mongoose.model(MODEL_NAME),
  toJSON,
};
