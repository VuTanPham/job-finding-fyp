const employeeRouter = require('express').Router({mergeParams: true});
const {addOne, updateOne, removeOne} = require('../controllers/employee-experience.controller')
const passport = require('passport');
const authorize = require('../middleware/authorization.middleware')

employeeRouter.use([authorize('employee')]);

employeeRouter.post('/', addOne);
employeeRouter.put('/:pjId', updateOne);
employeeRouter.delete('/:pjId', removeOne);

module.exports = employeeRouter;