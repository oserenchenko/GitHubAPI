function gitHubCall(repoURL) {
  let urlCall = "https://api.github.com/repos" + repoURL + "/pulls";
  console.log(urlCall);
  $.ajax({
    url: urlCall,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  })
}

$(".btn").on("click", function(event) {
  event.preventDefault();
  let repoURL = $("#inputRepoURL").val().trim().slice(18);
  console.log(repoURL);
  if (repoURL) {
    console.log("making call to GitHub API");
    gitHubCall(repoURL);
  } else {
    console.log("Please input a repository URL");
  }
})