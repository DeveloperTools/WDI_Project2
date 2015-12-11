$.ajax({
  url: url,
  type: 'GET',
  dataType: 'json'
})
.done(function(data) {
  console.log("success");
  teamjson = data;
  console.log(data);
  var $team1 = $("<div>", {class: "teamName"}).text("Team 1 owned by:");
  $('#results_team1').append($team1);

  $('#results_team1').append('Batters');
  for (var i = 1; i < 10 ; i++) {
    var pid = "player" + i + "_id";
    var $player = $("<div>", {class: "playerContainer", id: "player" + i});
    var $name = $("<div>", {class: "playerName"});
    $name.text("Batter " + i + ": " + teamjson.team1[i-1]);
    $player.append($name);
    $('#results').append($player);
  }
  $('#results_team1').append('PITCHERS');
  for (var i = 10; i < 17 ; i++) {
    var pid = "player" + i + "_id";
    var $player = $("<div>", {class: "playerContainer", id: "player" + i});
    var $name = $("<div>", {class: "playerName"});
    $name.text("Pitcher " + (i-9) + ": " + teamjson.team1[i-1]);
    $player.append($name);
    $('#results_team1').append($player);
  }

  var $team2 = $("<div>", {class: "teamName"}).text("Team 2 owned by:");
  $('#results_team2').append($team2);

  $('#results_team2').append('Batters');
  for (var i = 1; i < 10 ; i++) {
    var pid = "player" + i + "_id";
    var $player = $("<div>", {class: "playerContainer", id: "player" + i});
    var $name = $("<div>", {class: "playerName"});
    $name.text("Batter " + i + ": " + teamjson.team2[i-1]);
    $player.append($name);
    $('#results_team2').append($player);
  }
  $('#results_team2').append('PITCHERS');
  for (var i = 10; i < 17 ; i++) {
    var pid = "player" + i + "_id";
    var $player = $("<div>", {class: "playerContainer", id: "player" + i});
    var $name = $("<div>", {class: "playerName"});
    $name.text("Pitcher " + (i-9) + ": " + teamjson.team2[i-1]);
    $player.append($name);
    $('#results_team2').append($player);
  }
  if (teamjson.team1[15] && teamjson.team2[15]){
  var $simbutton = $("<button>", {class: "simButton", id: "simButton", onclick: "runSimulation();" });
  $('#results_team2').append($simbutton);
  console.log("added simbutton");
  }

})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});

console.log(teamjson);

function runSimulation() {
  // body...
  $.ajax({
    url: simUrl,
    type: 'GET'
  })
  .done(function(data) {
    console.log("success running sim");
    console.log(data);
  })
  .fail(function() {
    console.log("error running sim");
  })
  .always(function() {
    console.log("complete");
  });

}
