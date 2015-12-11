$.ajax({
  url: url,
  type: 'GET',
  dataType: 'json'
})
.done(function(data) {
  console.log("success");
  teamjson = data;
  console.log(data);

  var $battersHeader = $("<div>", {class: "battersHeader"}).text("BATTERS");
  var $pitchersHeader = $("<div>", {class: "pitchersHeader"}).text("PITCHERS");

  var $team1 = $("<div>", {class: "teamName teamOne"}).text(current_account);
  $('#results_teamOne').append($team1);
  $('#results_teamOne').append("<div class='battersHeader'>BATTERS</div>");
  for (var i = 1; i < 10 ; i++) {
    var pid = "player" + i + "_id";
    var $player = $("<div>", {class: "playerContainer", id: "player" + i});
    var $name = $("<div>", {class: "playerName batter"});
    $name.text("Batter " + i + ": " + teamjson.team1[i-1]);
    $player.append($name);
    $('#results_teamOne').append($player);
  }
  $('#results_teamOne').append("<div class='pitchersHeader'>PITCHERS</div>");
  for (var i = 10; i < 17 ; i++) {
    var pid = "player" + i + "_id";
    var $player = $("<div>", {class: "playerContainer", id: "player" + i});
    var $name = $("<div>", {class: "playerName pitcher"});
    $name.text("Pitcher " + (i-9) + ": " + teamjson.team1[i-1]);
    $player.append($name);
    $('#results_teamOne').append($player);
  }
  //
  var $team2 = $("<div>", {class: "teamName teamTwo"}).text(opponent_account);
  $('#results_teamTwo').append($team2);
  $('#results_teamTwo').append("<div class='battersHeader'>BATTERS</div>");
  for (var i = 1; i < 10 ; i++) {
    var pid = "player" + i + "_id";
    var $player = $("<div>", {class: "playerContainer", id: "player" + i});
    var $name = $("<div>", {class: "playerName batter"});
    $name.text("Batter " + i + ": " + teamjson.team2[i-1]);
    $player.append($name);
    $('#results_teamTwo').append($player);
  }
  $('#results_teamTwo').append("<div class='pitchersHeader'>PITCHERS</div>");
  for (var i = 10; i < 17 ; i++) {
    var pid = "player" + i + "_id";
    var $player = $("<div>", {class: "playerContainer", id: "player" + i});
    var $name = $("<div>", {class: "playerName pitcher"});
    $name.text("Pitcher " + (i-9) + ": " + teamjson.team2[i-1]);
    $player.append($name);
    $('#results_teamTwo').append($player);
  }
  if (teamjson.team1[15] && teamjson.team2[15]){
  var $simbutton = $("<button>", {class: "simButton u-full-width button-primary", id: "simButton", onclick: "runSimulation();" }).text("> >  SIMULATE GAME  < <");
  $('.sim_button_container').append($simbutton);
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
    type: 'GET',
    dataType: 'json'
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
