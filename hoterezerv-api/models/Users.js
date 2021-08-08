const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    useUsername: String,
    usePassword: String,
    useFirstname: String,
    useLastname: String,
    useEmail: String,
    useMobile: String,
    useIsAdmin: Boolean
})

module.exports = mongoose.model('Users',Users)