const {
  signToken,
  registerAccount,
} = require("../services/authenticate.service");

const login = async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      user: req.user,
      token: signToken(req.user.username),
      isAuthenticated: req.isAuthenticated(),
    });
  }
};

const register = async (req, res) => {
  try {
    await registerAccount(req.body);
    res.status(201).json({ message: "Account created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
};
