function getLeagues() {
  $.ajax({
    url: '/league/myleagues',
    type: 'GET',
    dataType:'json'
  })
  .done(function(data) {
    console.log("success");
    console.log(data);
    createLeagueList(data);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}
