const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);