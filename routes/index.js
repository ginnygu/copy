var express = require("express");
var router = express.Router();
const { getSignupPage } = require("./pages/controller/viewController");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});
router.get("/sign-up", getSignupPage);
router.get("/login", (req, res) => {
	res.render("main/login");
});

module.exports = router;
