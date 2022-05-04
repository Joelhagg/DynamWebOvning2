var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("users root");
});

router.get("/newUser", function (req, res) {
  res.send("new user router");
});

router.post("/newUser", function (req, res) {});

module.exports = router;
