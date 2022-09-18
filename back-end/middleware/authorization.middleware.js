const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.accountType)) {
      return res.status(403).json({ message: "Permission Denied" });
    }
    next();
  };
};

module.exports = authorize;
