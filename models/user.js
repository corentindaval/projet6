const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const { stringify } = require('querystring');


const userschema = mongoose.Schema({
    userId: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

userschema.plugin(uniquevalidator);

module.exports = mongoose.model('user', userschema);