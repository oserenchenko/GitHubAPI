const express = require("express");
const router = express.Router();
let array = [];

router.get("/", function(req, res) {
  res.render("index", {array: array});
});

router.post("/", function(req, res) {
  console.log(req.body.responseArr);
  array = [];
  array = req.body.responseArr;
});

// Export routes for server.js to use.
module.exports = router;