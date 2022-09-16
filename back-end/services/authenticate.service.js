const { User, EmployeeProfile, CompanyProfile } = require("../models");
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
      ? new CompanyProfile({ ...company, account })
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

module.exports = {
  registerAccount,
  signToken,
  changePassword,
};
