const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    branch: {
        type: mongoose.Types.ObjectId,
        ref: 'branch'
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