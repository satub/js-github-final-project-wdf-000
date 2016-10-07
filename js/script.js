
$(document).ready(function(){
  issuePoster = new GithubInteractor;
  $('form').on("submit", function(){
    submitForm(event);
  });
});

var issuePoster;
//////EMPTY THIS BEFORE PUSHING
class GithubInteractor {
  constructor(token = "YOUWISH"){
    this.token = token
  };
}

function  createIssue(repo, owner, title, body){
    var url;
    var urlBase = "https://api.github.com/repos/";
    var urIssues;
    url = urlBase + owner + '/' + repo + '/issues';
    // POST /repos/:owner/:repo/issues
    urIssues = {title: title, body: body};
    // console.log(url)
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(urIssues),
      headers: {
        Authorization: "token " + issuePoster.token
      }
    }).done(function(response){
      // console.log("deal with it");
      var newItem = `<a href=\"${response.url}\">${response.title}</a>`;
      $('#issue').append(newItem);
    }).fail(function(error){
      console.log("Post error: " + error);
    });
  };

function  submitForm(event){
      event.preventDefault();
    // $('form').click("submit", function(event){
      var repo = $('#repoName').val();
      var owner = $('#repoOwner').val();
      var title = $('#title').val();
      var body = $('#body').val();

    // });

      createIssue(repo, owner, title, body);
      // event.preventDefault();
  };
