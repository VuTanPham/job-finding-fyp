const {EmployeeProfile, EmployeeExperience} = require('../models');


const addNewExperience = async (userId, experience) => {
    const employee = await EmployeeProfile.findOne({account: userId});
    const newExp = new EmployeeExperience({...experience});
    await newExp.save();
    employee.experiences.push(newExp);
    await employee.save();
}

const removeExperience = async (userId, expId) => {
    const employee = await EmployeeProfile.findOne({account: userId}).populate('experiences', '_id');
    employee.experiences = employee.experiences.filter(item => item._id !== expId);
    await employee.save();
    await EmployeeExperience.findByIdAndDelete(expId);
}

const updateExperience = async (expId, updateExp) => {
    await EmployeeExperience.findByIdAndUpdate(expId, updateExp);
}

module.exports = {
    addNewExperience,
    removeExperience,
    updateExperience
}