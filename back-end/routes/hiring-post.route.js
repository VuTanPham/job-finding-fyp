const hiringPostRoute = require("express").Router();
const passport = require("passport");
const authorize = require("../middleware/authorization.middleware");

const {
  getAllHiringPosts,
  create,
  update,
  remove,
  getAllOwnHiringPosts,
  applyToPost,
  getPostsApplied,
  undoAppliedPost,
  getUserPosts,
  getOne,
} = require("../controllers/hiring-post.controller");

hiringPostRoute.use(passport.authenticate("jwt", { session: false }));

hiringPostRoute.get("/", getAllHiringPosts);
hiringPostRoute.get("/manage",authorize('company'), getAllOwnHiringPosts);
hiringPostRoute.get("/job-applied",authorize('employee'), getPostsApplied);
hiringPostRoute.put("/job-applied/undo",authorize('employee'), undoAppliedPost);
hiringPostRoute.get("/user/:id", getUserPosts);
hiringPostRoute.get("/:id", getOne);
hiringPostRoute.post("/", authorize("company"), create);
hiringPostRoute.post("/apply", authorize("employee"), applyToPost);
hiringPostRoute.put("/:id", authorize("company"), update);
hiringPostRoute.delete("/:id", authorize("company"), remove);

module.exports = hiringPostRoute;
