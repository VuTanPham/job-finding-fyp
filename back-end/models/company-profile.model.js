const mongoose = require("mongoose");

const CompanyProfileSchema = new mongoose.Schema({
 name: String,
 industryField: {type: mongoose.Schema.Types.ObjectId, ref: 'industry-fields'},
 introduction: String,
 bannerLink: String,
 account: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
}, {timestamps: true});

const CompanyProfile = mongoose.model("company-profiles", CompanyProfileSchema);

module.exports = CompanyProfile;
