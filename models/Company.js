const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    headOffice: {
        type: mongoose.Types.ObjectId,
        ref: 'company'
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
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

module.exports = mongoose.model('company', CompanySchema);