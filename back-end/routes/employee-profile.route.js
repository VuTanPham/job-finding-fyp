const employeeRouter = require('express').Router({mergeParams: true});
const {addOne, updateOne, removeOne} = require('../controllers/employee-profile.controller')
const passport = require('passport');
const authorize = require('../middleware/authorization.middleware')

employeeRouter.use([passport.authenticate('jwt', {session: false}, authorize('employee'))]);

employeeRouter.post('/', addOne);
employeeRouter.put('/:expId', updateOne);
employeeRouter.delete('/:expId', removeOne);

module.exports = employeeRouter;