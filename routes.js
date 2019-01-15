const express = require("express");
const router = express.Router();
let pullReqs = [];
let repoName = "";

router.get("/", function(req, res) {
  res.render("index",
  {pullReqs: pullReqs, repoName: repoName}
  );
});

router.post("/", function(req, res) {
  console.log(req.body.responseArr);
  pullReqs = [];
  repoName = "";
  pullReqs = req.body.responseArr;
  repoName = req.body.responseArr[0].head.repo.full_name;
  res.json(req.body);
});

// Export routes for server.js to use.
module.exports = router;