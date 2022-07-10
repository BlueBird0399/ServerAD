const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    company: {
        type: mongoose.Types.ObjectId,
        ref: 'company'
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