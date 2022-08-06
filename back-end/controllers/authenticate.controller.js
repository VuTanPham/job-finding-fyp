const {
  signToken,
  registerAccount,
} = require("../services/authenticate.service");

const login = async (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ user: req.user, token: signToken(req.user.username) });
  }
};

const register = async (req, res) => {
    try {
        await registerAccount(req.body);
        res.status(201).json({message: 'Account created'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

module.exports = {
  login,
  register,
};
