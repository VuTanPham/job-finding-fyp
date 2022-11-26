const appRouter = require('express').Router();

const authRouter = require('./authenticate.route');
const chatRouter = require('./chat.router');
const hiringPostRouter = require('./hiring-post.route');
const industryFieldRouter = require('./industry-fields.route');
const userRouter = require('./user.route');

appRouter.use('/auth', authRouter);
appRouter.use('/hiring-posts', hiringPostRouter);
appRouter.use('/industry-fields', industryFieldRouter);
appRouter.use('/users', userRouter);
appRouter.use('/conservations', chatRouter);

module.exports = appRouter;