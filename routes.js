const express = require("express");
const router = express.Router();
let pullReqsAll = [];
let repoName = "";

router.get("/", function(req, res) {
  res.render("index", {
    repoName: repoName,
    pullReqsAll: pullReqsAll
  })
});

router.post("/", function(req, res) {
  let data = req.body;
  pullReqsAll = [];
  for(i=0; i<data.pullReqs.length; i++) {
    pullReqsAll.push({
      pullReqs: data.pullReqs[i],
      numComments: data.numComments[i],
      numCommits: data.numCommits[i]
    })
  }
  repoName = "";
  repoName = data.pullReqs[0].head.repo.full_name;
  res.json(req.body);
});

// Export routes for server.js to use.
module.exports = router;