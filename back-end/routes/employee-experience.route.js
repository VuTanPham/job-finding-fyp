const employeeRouter = require('express').Router({mergeParams: true});
const {addOne, updateOne, removeOne} = require('../controllers/employee-projects.controller')
const passport = require('passport');
const authorize = require('../middleware/authorization.middleware')

employeeRouter.use([passport.authenticate('jwt', {session: false}, authorize('employee'))]);

employeeRouter.post('/', addOne);
employeeRouter.put('/:pjId', updateOne);
employeeRouter.delete('/:pjId', removeOne);

module.exports = employeeRouter;