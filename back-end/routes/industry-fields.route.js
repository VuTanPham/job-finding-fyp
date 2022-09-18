const industryFieldRouter = require('express').Router();
const authorize = require('../middleware/authorization.middleware');
const passport = require('passport');

const {getAllIndustryFields, getIndustryFieldById, createIndustryField, updateIndustryField, removeIndustryField} = require('../controllers/industry-fields.controller');

industryFieldRouter.get('/', getAllIndustryFields);
industryFieldRouter.post('/', [passport.authenticate('jwt', {session: false}), authorize('admin')], createIndustryField);
industryFieldRouter.get('/:id', getIndustryFieldById);
industryFieldRouter.put('/:id', [passport.authenticate('jwt', {session: false}), authorize('admin')], updateIndustryField);
industryFieldRouter.delete('/:id', [passport.authenticate('jwt', {session: false}), authorize('admin')], removeIndustryField);

module.exports = industryFieldRouter;