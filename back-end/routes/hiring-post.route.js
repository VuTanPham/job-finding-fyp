const hiringPostRoute = require("express").Router();
const passport = require("passport");
const authorize = require("../middleware/authorization.middleware");

const {
  getAllHiringPosts,
  create,
  update,
  remove,
} = require("../controllers/hiring-post.controller");

hiringPostRoute.use(passport.authenticate("jwt", { session: false }));

hiringPostRoute.get("/", getAllHiringPosts);
hiringPostRoute.post("/", authorize("company"), create);
hiringPostRoute.put("/:id", authorize("company"), update);
hiringPostRoute.delete("/:id", authorize("company"), remove);

module.exports = hiringPostRoute;
