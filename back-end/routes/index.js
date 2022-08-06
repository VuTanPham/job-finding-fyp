const appRouter = require('express').Router();

const authRouter = require('./authenticate.route');

appRouter.use('/auth', authRouter);

module.exports = appRouter;