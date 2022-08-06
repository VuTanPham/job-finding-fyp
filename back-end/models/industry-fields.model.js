const mongoose = require("mongoose");

const IndustryFieldSchema = new mongoose.Schema({
  name: String
}, {timestamps: true});

const IndustryField = mongoose.model("industry-fields", IndustryFieldSchema);

module.exports = IndustryField;
