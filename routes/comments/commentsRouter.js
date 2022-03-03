var express = require("express");
var router = express.Router();

const { jwtMiddleware } = require("../utils/index");
const {
  createComment,
  deleteComment,
  updateComment,
} = require("./controller/commentsController");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "comment" });
});

router.post("/create-comment/:id", jwtMiddleware, createComment);
router.delete("/delete-comment/:id", jwtMiddleware, deleteComment);
router.put("/update-comment/:id", jwtMiddleware, updateComment);

module.exports = router;
