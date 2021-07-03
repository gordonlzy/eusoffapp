const mongoose = require('mongoose');
const User = require('./User');

const requestSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please enter a category"]
    },
    credit: {
        type: String,
        required: [true, "Please enter the number of credits"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
    },
    takenBy: {
        type: String,
    },
    remark: {
        type: String,
    },
    status: {
        type: String,
    }
}, { timestamps: true });

const Request = mongoose.model('request', requestSchema);

module.exports = Request;