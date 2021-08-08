const mongoose = require('mongoose');

const RoomTypes = new mongoose.Schema({
    rtyName: String,
});

module.exports = mongoose.model('RoomTypes',RoomTypes)