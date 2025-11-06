const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    tittle : {
    type: String,
    required: true},

    price : {
    type: Number,
    required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);