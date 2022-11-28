const userRouter = require('express').Router();
const passport = require('passport');
const authorize = require('../middleware/authorization.middleware')
const {getAll, getOne, updateOne, updateUserBanStatus} = require('../controllers/user-profile.controller')
const employeeRouter = require('./employee-experience.route');
const employeeProject = require('./employee-projects.router');

userRouter.use(passport.authenticate('jwt', {session: false}));

userRouter.get('/', authorize('admin'),getAll);
userRouter.get('/:userId', getOne);
userRouter.put('/:userId',authorize(['employee', 'company']), updateOne);
userRouter.put('/:userId/status',authorize(['admin']), updateUserBanStatus);

userRouter.use('/:userId/experiences', employeeRouter);
userRouter.use('/:userId/projects', employeeProject);

module.exports = userRouter;