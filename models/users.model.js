const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./courses.model');

const userSchema = new mongoose.Schema({
    firstName : {
    type: String,
    required: true},

    lastName : {
    type: String,
    required: true
    },

    email : {
    type: String,
    required: true,
    unique: true,
    validate: {validator : validator.isEmail, message: 'Invalid email format'}
    },

    password : {
    type: String,
    required: true,
    },

    token : {
    type: String,
    }
});

module.exports = mongoose.model('Users', userSchema);