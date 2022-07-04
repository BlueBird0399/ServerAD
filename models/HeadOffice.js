const mongoose = require('mongoose');

const HeadOfficeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        require: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('headOffice', HeadOfficeSchema);