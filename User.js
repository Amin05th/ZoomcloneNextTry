const mongoose = require('mongoose')

const User = new mongoose.Schema({
    _id: String,
})

module.exports = mongoose.model('User', User)