//passes results of open pull requests to backend through ajax call
function openPullReq(responseArr) {
  $.ajax("/", {
    type: "POST",
    data: {responseArr}
  }).then(function() {
    console.log("passing data to backend");
    window.location.href = "/";
  })
};

// 
function commentsCommits (responseArr, urlCall) {
  
  for (i = 0; i < responseArr.length; i++) {
    let commentsURL = "https://api.github.com/repos" + urlCall + "/pulls/" + responseArr[i].number + "/comments";
    let commitsURL = "https://api.github.com/repos" + urlCall + "/pulls/" + responseArr[i].number + "/commits";
    $.ajax({
      url: commentsURL,
      method: "GET",
      success: function(response) {
        console.log("comments", response);
      },
      error: function(request, status, errorThrown) {
        console.log("error");
      }
    }).then(function() {
      console.log("completed calls")
    })

    // openPullReq(response);
  }
}

//ajax call to GitHub API using input repository URL
function gitHubCall(repoURL) {
  let urlCall = "https://api.github.com/repos" + repoURL + "/pulls";
  $.ajax({
    url: urlCall,
    method: "GET",
    success: function (response) {
      console.log(response);
      if (response[0]) {
        $(".response").text("This repository has " + response.length + " open pull request(s):")
        commentsCommits(response, repoURL);
        // openPullReq(response);

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
  console.log(repoURL);
  if (repoURL) {
    console.log("making call to GitHub API");
    gitHubCall(repoURL);
  } else {
    console.log("Please input a repository URL");
    $(".response").text("Please input a repository URL.");
  }
});