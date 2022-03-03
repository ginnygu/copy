var express = require("express");
var router = express.Router();
const {
  getCurrentUser,
  createUser,
  userLogin,
  updateProfile,
} = require("./controller/userController");
const {
  userCreateValidator,
  validateLoginData,
  validateUpdateData,
} = require("./lib/authMiddleware/index");
const { checkIfEmpty, jwtMiddleware } = require("../utils/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// router.get("/get-current-user", jwtMiddleware, getCurrentUser);
router.post("/create-user", checkIfEmpty, userCreateValidator, createUser);
router.post("/login", checkIfEmpty, validateLoginData, userLogin);
router.put(
  "/update-profile",
  jwtMiddleware,
  checkIfEmpty,
  validateUpdateData,
  updateProfile
);

module.exports = router;
