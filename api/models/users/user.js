const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  token: String,
  password: String,
  status: { type: Boolean , default: false},
  created_at: { type: Date , default: Date.now},
  updated_at: { type: Date , default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
