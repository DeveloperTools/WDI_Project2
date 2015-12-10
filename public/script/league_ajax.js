function getLeagues() {
  $.ajax({
    url: '/league/myleagues',
    type: 'GET',
    dataType:'json'
  })
  .done(function(data) {
    // console.log("success");
    console.log(data);
    createLeagueList(data);
  })
  .fail(function() {
    // console.log("error");
  })
  .always(function() {
    // console.log("complete");
  });
};

function createLeague() {
  var createLeagueForm = {
    league_name: $("#league_name").val(),
    team1_owner: $("#owner_one").val(),
    team2_owner: $("#owner_two").val()
  };
  $.ajax({
    url: '/league/create',
    type: 'POST',
    dataType: 'json',
    data: createLeagueForm
  })
  .done(function(data) {
    // console.log("success");
    // console.log(data);
    resetLeagueList();
    clearFormData();
    getLeagues();
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    // console.log("complete");
  });
}
