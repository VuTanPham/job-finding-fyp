const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: String,
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
}, {timestamps: true})

const MessageModel = mongoose.model('messages', MessageSchema);

module.exports = MessageModel;