const userRouter = require('express').Router();
const passport = require('passport');
const authorize = require('../middleware/authorization.middleware')
const {getAll, getOne, updateOne} = require('../controllers/user-profile.controller')
const employeeRouter = require('./employee-profile.route')

userRouter.use(passport.authenticate('jwt', {session: false}));

userRouter.get('/', getAll);
userRouter.get('/:userId', getOne);
userRouter.put('/:userId',authorize(['employee', 'company']), updateOne);

userRouter.use('/:userId/experience', employeeRouter);

module.exports = userRouter;