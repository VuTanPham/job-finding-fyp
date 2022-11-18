const mongoose = require("mongoose");

const EmployeeExperienceSchema = new mongoose.Schema({
    startDate: Date,
    endDate: Date,
    isCurrent: {type: Boolean, default: false},
    companyName: String,
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'company-profiles'},
    jobPosition: String,
    description: String
}, { timestamps: true });

const EmployeeExperience = mongoose.model(
  "employee-experiences",
  EmployeeExperienceSchema
);

module.exports = EmployeeExperience;
