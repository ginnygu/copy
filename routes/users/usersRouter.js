var express = require("express");
var router = express.Router();
const { checkIfEmpty } = require("../utils/index");
const { userCreateValidator } = require("./lib/authMiddleware/index");
const { createUser } = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("hello from usersRouter");
});

router.post("/create-user", checkIfEmpty, userCreateValidator, createUser);

module.exports = router;
