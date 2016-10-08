$(document).ready(function(){
  // $('form').on("submit", function(){ ///why can't this be here?
  //   submitForm(event);
  // });
  submitForm();
});

function GithubInteractor(token) {
  this.token = token;
};

//////EMPTY THIS BEFORE PUSHING
var issuePoster = new GithubInteractor("MONKEY BUSINESs");

function  submitForm(){
    $('form').on("submit", function(event){
      var repo = $('#repoName').val();
      var owner = $('#repoOwner').val();
      var title = $('#title').val();
      var body = $('#body').val();
      createIssue(repo, owner, title, body);
      event.preventDefault();
    });
  };

function handleResponse(response){
  var newItem = `<a href=\"${response.url}\">${response.title}</a>`;
  $('#issue').append(newItem);
}

function handleError(error){
  console.log("Post error: " + error);
}

function  createIssue(repo, owner, title, body){
    var url;
    var urlBase = "https://api.github.com/repos/";
    var urIssues;
    url = urlBase + owner + '/' + repo + '/issues';
    urIssues = { title: title, body: body };
    $.ajax({
      type: 'POST',
      url: url,
      headers: {
        Authorization: "token " + issuePoster.token
      },
      data: JSON.stringify(urIssues)
    }).done(handleResponse).fail(handleError);
  };
