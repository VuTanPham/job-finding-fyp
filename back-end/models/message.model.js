const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: String,
    sendBy: String,
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'company-profiles'},
    employee: {type: mongoose.Schema.Types.ObjectId, ref: 'employee-profiles'},
}, {timestamps: true})

const MessageModel = mongoose.model('messages', MessageSchema);

module.exports = MessageModel;