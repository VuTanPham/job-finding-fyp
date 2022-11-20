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
  const allUsers = await User.estimatedDocumentCount();
  const totalPages = Math.ceil(allUsers / LIMIT);

  return {
    data: await User.find()
      .skip((page - 1) * LIMIT)
      .limit(LIMIT),
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
    data = await EmployeeProfile.findOne({ account: userId }).populate(
      "account"
    );
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
