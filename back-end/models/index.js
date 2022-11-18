const User = require("./user.model");
const CompanyProfile = require('./company-profile.model');
const EmployeeProfile = require('./employee-profile.model');
const EmployeeExperience = require('./employee-experience.model');
const IndustryFields = require('./industry-fields.model');
const HiringPost = require('./hiring-post.model');
const Project = require('./project.model');
const Conservation = require('./conversation.model');
const Message = require('./message.model');

module.exports = {
    User,
    CompanyProfile,
    EmployeeExperience,
    EmployeeProfile,
    IndustryFields,
    HiringPost,
    Project,
    Conservation,
    Message
}