const appRouter = require('express').Router();

const authRouter = require('./authenticate.route');
const hiringPostRouter = require('./hiring-post.route');
const industryFieldRouter = require('./industry-fields.route')

appRouter.use('/auth', authRouter);
appRouter.use('/hiring-posts', hiringPostRouter);
appRouter.use('/industry-fields', industryFieldRouter);

module.exports = appRouter;