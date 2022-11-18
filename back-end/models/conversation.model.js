const mongoose = require('mongoose');


const ConservationSchema = new mongoose.Schema({
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref : 'messages'}],
    readBy: [{type: mongoose.Schema.Types.ObjectId, ref : 'users'}]
})

const Conservation = mongoose.model('conservations', ConservationSchema);

module.exports = Conservation;