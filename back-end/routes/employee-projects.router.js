const employeeProject = require('express').Router({mergeParams: true});
const {addOne, updateOne, removeOne} = require('../controllers/employee-experience.controller')
const passport = require('passport');
const authorize = require('../middleware/authorization.middleware')

employeeProject.use([passport.authenticate('jwt', {session: false}, authorize('employee'))]);

employeeProject.post('/', addOne);
employeeProject.put('/:expId', updateOne);
employeeProject.delete('/:expId', removeOne);

module.exports = employeeProject;