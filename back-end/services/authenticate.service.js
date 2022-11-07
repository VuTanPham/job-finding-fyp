const { User, EmployeeProfile, CompanyProfile, IndustryFields } = require("../models");
const CryptoJS = require("crypto-js");
const Jwt = require("jsonwebtoken");

const signToken = (payload) => {
  return Jwt.sign(
    {
      issuer: "job-finding-fyp-v1",
      subject: payload,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "64800s",
    }
  );
};

const registerAccount = async ({
  accountType,
  username,
  password,
  email,
  location,
  employee,
  company,
}) => {
  const checkUsedUsername = await User.findOne({ username });
  const checkUsedEmail = await User.findOne({ email });
  console.log(checkUsedUsername)
  if (checkUsedUsername) {
    throw new Error("username had been used");
  }
  if (checkUsedEmail) {
    throw new Error("email had been used");
  }
  const account = new User({
    accountType,
    username,
    password,
    email,
    location,
  });
  await account.save();
  const profile =
    accountType === "company"
      ? new CompanyProfile({ ...company, account, industryField: await IndustryFields.findById(company.industryField)})
      : new EmployeeProfile({ ...employee, account });
  await profile.save();
};

const changePassword = async ({ username, oldPassword, newPassword }) => {
  const checkAccount = await User.findOne({ username });
  const decryptedPassword = CryptoJS.AES.decrypt(
    checkAccount.password,
    process.env.ENCRYPT_KEY
  );
  if (decryptedPassword === oldPassword) {
    checkAccount.password = newPassword;
    await checkAccount.save();
  } else {
    throw new Error("Old Password is wrong");
  }
};

const getProfile = async (user) => {
  if(user.accountType === "company") {
    return await CompanyProfile.findOne({account: user._id})
  }
  return await EmployeeProfile.findOne({account: user._id})
}

module.exports = {
  registerAccount,
  signToken,
  changePassword,
  getProfile
};
