const employeeProject = require('express').Router({mergeParams: true});
const {addOne, updateOne, removeOne} = require('../controllers/employee-projects.controller')
const passport = require('passport');
const authorize = require('../middleware/authorization.middleware')

employeeProject.use([authorize('employee')]);

employeeProject.post('/', addOne);
employeeProject.put('/:pjId', updateOne);
employeeProject.delete('/:pjId', removeOne);

module.exports = employeeProject;