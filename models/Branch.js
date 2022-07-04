const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({
    headOffice: {
        type: mongoose.Types.ObjectId,
        ref: 'heafOfice'
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

module.exports = mongoose.model('branch', BranchSchema);