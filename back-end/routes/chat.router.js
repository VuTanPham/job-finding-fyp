const chatRouter = require("express").Router();
const passport = require("passport");
const { getAll, getOne, deleteOne } = require("../controllers/chat.controller");
const authorize = require("../middleware/authorization.middleware");


chatRouter.use(passport.authenticate("jwt", { session: false }));

chatRouter.get("/", authorize(['company', 'employee']),getAll);
chatRouter.get("/:id", authorize(['company', 'employee']), getOne);

module.exports = chatRouter;
