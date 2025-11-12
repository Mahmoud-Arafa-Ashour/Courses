const mongoose = require('mongoose');
const validator = require('validator');
const { validate } = require('./courses.model');
const userRoles = require('../data/roles_data.js');

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
    } ,
    role :  {
    type: String,
    enum : [userRoles.ADMIN , userRoles.USER],
    default : userRoles.USER
    } ,
    Avatar : {
    type: String,
    }
});

module.exports = mongoose.model('Users', userSchema);