const mongoose = require('mongoose');


const ConservationSchema = new mongoose.Schema({
    employee: {type: mongoose.Schema.Types.ObjectId, ref: 'employee-profiles'},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'company-profiles'},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref : 'messages'}],
    readBy: [{type: mongoose.Schema.Types.ObjectId, ref : 'users'}]
}, {timestamps: true})

const Conservation = mongoose.model('conservations', ConservationSchema);

module.exports = Conservation;