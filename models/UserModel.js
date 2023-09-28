const mongoose = require('mongoose');

const Schema = mongoose.Schema({
username:String,
avatar:String,
email:String,
password:String

})

const UserModel = mongoose.model('User',Schema);

module.exports = UserModel;