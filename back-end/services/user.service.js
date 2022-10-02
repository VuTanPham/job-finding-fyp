const { model } = require('mongoose')
const {User, EmployeeProfile, CompanyProfile} = require('../models')

const LIMIT = 10;

const updateUserProfile = async (userId, {email,location, profile}) => {
    const user = await User.findById(userId);
    user.email = email;
    user.location = location;
    await user.save();
    if(user.accountType === 'company') {
      await CompanyProfile.findOneAndUpdate({account: userId}, {...profile});  
    }
    else {
        await EmployeeProfile.findOneAndUpdate({account: userId}, {...profile});  
    }
}

const getAllUsers = async (page = 1) => {
    const allUsers = await User.estimatedDocumentCount();
    const totalPages = Math.ceil(allUsers / LIMIT);

    return {
        data: await User.find().skip((page - 1) * LIMIT).limit(LIMIT),
        totalPages
    }
}

const getUserDetail = async (userId) => {
    const user = await User.findById(userId);
    let data;
    if(user.accountType === 'company') {
        data = await CompanyProfile.findOne({account: userId}).populate('account');
    }
    else {
        data = await EmployeeProfile.findOne({account: userId}).populate('account');
    }
    return {data}
}


module.exports = {updateUserProfile, getAllUsers, getUserDetail}