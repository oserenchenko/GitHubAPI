

//ajax call to GitHub API using input repository URL
function gitHubCall(repoURL) {
  let urlCall = "https://api.github.com/repos" + repoURL + "/pulls";
  console.log(urlCall);
  $.ajax({
    url: urlCall,
    method: "GET",
    success: function(response) {
    console.log(response);
    if (response[0]) {
      $(".response").text("This repository does have active pull requests.")
    } else {
      $(".response").text("This repository does NOT have active pull requests.")
    }
  },
    error: function(request,status,errorThrown) {
      $(".response").text("There has been an error, please check your repository URL to make sure it is correct.");
    }
})
}

//Handling submit button click event - if the input has a value, use it to call the gitHubCall function
$(".btn").on("click", function(event) {
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
})