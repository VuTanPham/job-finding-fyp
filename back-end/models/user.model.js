const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatarUrl: String,
    socketId: String,
    introduction: String,
    banned: {type: Boolean, default: false},
    accountType: {type: String, enum: ['employee', 'company', 'admin']},
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