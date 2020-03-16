const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  username: String,
  password: String,
  email: String,
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema, 'users');
