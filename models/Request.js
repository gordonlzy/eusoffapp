const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please enter a category"]
    },
    credit: {
        type: Number,
        required: [true, "Please enter the number of credits"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
    },
    takenBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    remark: {
        type: String,
    },
    status: {
        type: String,
    },
    pendingCredit: {
        type: Number,
    }
}, { timestamps: true });

const Request = mongoose.model('request', requestSchema);

module.exports = Request;