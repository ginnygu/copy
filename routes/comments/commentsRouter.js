var express = require("express");
var router = express.Router();
const { getComment } = require("./controller/commentsController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("hello from commentsRouter");
});
router.get("/get-comment", getComment);

module.exports = router;
