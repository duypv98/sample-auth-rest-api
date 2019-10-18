const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = { User }