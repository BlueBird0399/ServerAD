const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    branch: {
        type: mongoose.Types.ObjectId,
        ref: 'branch'
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    user_type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user',UserSchema);