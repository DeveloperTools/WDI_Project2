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

  var $team1 = $("<div>", {class: "teamName teamOne"}).text(teamjson.team1[16]);
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
  var $team2 = $("<div>", {class: "teamName teamTwo"}).text(teamjson.team2[16]);
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
  var $simbutton = $("<button>", {class: "simButton u-full-width button-primary", id: "simButton", onclick: "runSimulation();" }).text("> >  SIMULATE GAME  < <");
  $('.sim_button_container').append($simbutton);
  console.log("added simbutton");
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});

console.log(teamjson);
var simjson;
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
    simjson = data;
    $('#sim_results').empty();
    var $team1 = $("<div>", {class: "teamName teamTwo"}).text(data[0].team_name + " Results :");
    var $team2 = $("<div>", {class: "teamName teamTwo"}).text(data[1].team_name + " Results :");
    $('#sim_results').append($team1);
    $('#sim_results').append($team2);
    for (var i in data) {
      var statsString = " BA: " + data[i].ba_total + " ERA: " + data[i].era_total + " Hits:" + data[i].h_total + " HR: " + data[i].hr_total + " Ks: " + data[i].k_total + " Runs: " +
      data[i].r_total + " RBIs: " +
      data[i].rbi_total + " SBs: " + data[i].sb_total + " Saves: " + data[i].sv_total;
      if (i == 1) {
        $team2.append(statsString);
      } else {
        $team1.append(statsString);
      }
    }



  })
  .fail(function() {
    console.log("error running sim");
  })
  .always(function() {
    console.log("complete");
  });

}

// function declareWinner(simjson){
//   team1total = 0;
//   team2total = 0;
//   if () {
//
//   }
// }
