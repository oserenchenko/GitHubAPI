//passes results of open pull requests to backend through ajax call
function openPullReq(responseArr, comments, commits) {
  $.ajax("/", {
    type: "POST",
    data: {
      pullReqs: responseArr,
      numComments: comments,
      numCommits: commits
    }
  }).then(function() {
    console.log("passing data to backend");
    window.location.href = "/";
  })
};

// 
function commentsCommits (responseArr, urlCall) {
  let numComments = [];
  let numCommits = [];
  let itemsProcessed = 0;
  for (i = 0; i < responseArr.length; i++) {
    itemsProcessed++;
    let commentsURL = "https://api.github.com/repos" + urlCall + "/issues/" + responseArr[i].number + "/comments";
    let commitsURL = "https://api.github.com/repos" + urlCall + "/pulls/" + responseArr[i].number + "/commits";

    //ajax call to get number of comments for pull request
    $.ajax({
      url: commentsURL,
      method: "GET",
      success: function(commentResponse) {
        numComments.push(commentResponse.length);

        //ajax call to get number of commits for pull request
        $.ajax({
          url: commitsURL,
          method: "GET",
          success: function(commitsResponse) {
            numCommits.push(commitsResponse.length);
            if (itemsProcessed === responseArr.length) {
              openPullReq(responseArr, numComments, numCommits);
            }
          }
        })
      }
    }).then(function() {
      console.log("completed comments and commits calls")
    })
  }
}

//ajax call to GitHub API using input repository URL
function gitHubCall(repoURL) {
  let urlCall = "https://api.github.com/repos" + repoURL + "/pulls";
  $.ajax({
    url: urlCall,
    method: "GET",
    success: function (response) {
      if (response[0]) {
        commentsCommits(response, repoURL);
      } else {
        $(".response").text("This repository does NOT have any open pull requests.")
      }
    },
    error: function (request, status, errorThrown) {
      $(".response").text("There has been an error, please check your repository URL to make sure it is correct.");
    }
  })
};

//Handling submit button click event - if the input has a value, use it to call the gitHubCall function
$(".btn").on("click", function (event) {
  event.preventDefault();
  let repoURL = $("#inputRepoURL").val().trim().slice(18);
  if (repoURL) {
    gitHubCall(repoURL);
  } else {
    $(".response").text("Please input a repository URL.");
  }
});