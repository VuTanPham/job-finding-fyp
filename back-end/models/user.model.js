const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    location: String,
    accountType: {type: String, enum: ['employee', 'company']},
    isAdmin: {type: Boolean, default: false}
}, {timestamps: true})

UserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) {
      next();
    }
    user.password = CryptoJS.AES.encrypt(
      user.password,
      process.env.ENCRYPT_KEY
    ).toString();
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.validatePassword = async function (password, next) {
  try {
    const decrypted = CryptoJS.AES.decrypt(
      this.password,
      process.env.ENCRYPT_KEY
    );
    const rawPassword = decrypted.toString(CryptoJS.enc.Utf8);
    console.log(rawPassword === password)
    if (rawPassword === password) {
      return next(null, this);
    } else {
      return next(null, false);
    }
  } catch (error) {
    return next(error);
  }
};

const User = mongoose.model('users', UserSchema);

module.exports = User;