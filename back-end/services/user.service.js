const { User, EmployeeProfile, CompanyProfile } = require("../models");

const LIMIT = 5;

const updateUserProfile = async (userId, { profile, ...rest }) => {
  const user = await User.findById(userId);
  await User.findByIdAndUpdate(userId, { ...rest });
  if (user.accountType === "company") {
    await CompanyProfile.findOneAndUpdate({ account: userId }, { ...profile });
  } else {
    await EmployeeProfile.findOneAndUpdate({ account: userId }, { ...profile });
  }
};

const getAllUsers = async (page = 1) => {
  const allUsers = await User.find({accountType: {$ne: "admin"}});
  const totalPages = Math.ceil(allUsers.length / LIMIT);
  const data = await Promise.all( allUsers.map(async (user) => {
    if(user.accountType === 'company') {
      const profile = await CompanyProfile.findOne({account: user._id});
      return {
        _id: user._id,
        username: user.username,
        accountType: user.accountType,
        fullName: profile?.name,
        banned: user.banned
      }
    }
    else {
      const profile = await EmployeeProfile.findOne({account: user._id});
      return {
        _id: user._id,
        username: user.username,
        accountType: user.accountType,
        fullName: profile?.name,
        banned: user.banned
      }
    }
  }))

  return {
    data: data.splice((page - 1)* LIMIT, LIMIT),
    totalPages,
  };
};

const getUserDetail = async (userId) => {
  const user = await User.findById(userId);
  let data;
  if (user.accountType === "company") {
    data = await CompanyProfile.findOne({ account: userId }, null, {
      populate: [{ path: "account" }, { path: "industryField" }],
    });
  } else {
    data = await EmployeeProfile.findOne({ account: userId}, null , {
      populate: [{ path: "account" }, { path: "experiences" }, {path: 'projects'}]
    });
  }
  return data;
};

const changeUserBanStatus = async (userId, status) => {
  await User.findByIdAndUpdate(userId, { banned: status });
};

module.exports = {
  updateUserProfile,
  getAllUsers,
  getUserDetail,
  changeUserBanStatus,
};
