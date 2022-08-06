const authRouter = require('express').Router();
const passport = require('passport');

const authController = require('../controllers/authenticate.controller');

authRouter.post('/login', passport.authenticate('local'), authController.login);

authRouter.post('/register', authController.register);

module.exports = authRouter;