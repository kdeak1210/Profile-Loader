$(document).ready(function() {
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    // make AJAX request to Github
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '5f9c653274033616521a',
        client_secret: '981ffa4c77c5667a6424a600200a91111154ed55'
      }
    }).done(function(user) {  // ajax() returns a promise with the data
      $.ajax({
        url: user.repos_url,
        data: {
          client_id: '5f9c653274033616521a',
          client_secret: '981ffa4c77c5667a6424a600200a91111154ed55',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                </div>
              </div>
              <hr><br>
              <div class="row">
                <div class="col-md-2 col-xs-2">
                  <ul class ="languageList" id="label${index}"></ul>
                </div>
                <div class="col-md-8 col-xs-8">
                  <svg class="chart" id="graph${index}"></svg>
                </div>
              </div>
            </div>
          `);

          // Make a request for the languages used in each Repo
          $.ajax({
            url: repo.languages_url,
            data: {
              client_id: '5f9c653274033616521a',
              client_secret: '981ffa4c77c5667a6424a600200a91111154ed55',
            }
          }).done(function(languages){
            // Builds a graph of languages used for each repo
            buildGraph(languages, index);
          });
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos<small>With Top 5 Languages Used</small></h3>
        <div id="repos"></div>
      `);
    });
  });
});
