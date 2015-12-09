var leagueArray;

function getLeagues() {
  $.ajax({
    url: '/league/myleagues',
    type: 'GET',
    dataType:'json'
  })
  .done(function(data) {
    console.log("success");
    console.log(data);
    leagueArray = data;
    for (var i in leagueArray) {
      listitem = $('<li>').text(leagueArray[i].league_name);
      listitem.append(" <button>Go to league</button>");
      $('#leaguelist').append(listitem);
    }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

$(document).ready(function(){
  getLeagues();
}); //end of document.ready
