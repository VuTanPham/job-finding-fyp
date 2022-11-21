const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    projectDescription: String,
    repositoryUrl: String,
    startDate: Date,
    endDate: Date
}, {timestamps: true})

const ProjectModel = mongoose.model('projects', ProjectSchema);

module.exports = ProjectModel;