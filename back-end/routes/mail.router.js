const passport = require('passport');
const { sendMailToEmployee } = require('../controllers/mail.controller');

const mailRouter = require('express').Router();

mailRouter.use(passport.authenticate("jwt", { session: false }));

mailRouter.post('/', sendMailToEmployee);

module.exports = mailRouter;