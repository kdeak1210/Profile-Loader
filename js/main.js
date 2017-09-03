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
    }).done(function(user) {
      console.log(user);
    });
  });
});
