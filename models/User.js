const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'company'
    },
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    user_type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('user',UserSchema);