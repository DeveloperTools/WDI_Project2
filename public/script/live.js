//
//
function resetDraftPlayerList() {
  $(".draftPlayer").empty();
}

function updateDraftPlayerList(playerList){
  //
  playerListObject = playerList;
  var $draftList = $("#draftList");
  //
  for (var player in playerList) {
    // construct divs for players in list
    var $player = $("<div>", {id: playerList[player].playerid, class: "draftPlayer"});
    var $name = $("<div>", {class: "playerName"});
    var $headerContainer = $("<div>", {class: "headerContainer"})
    var $pitchingheaderContainer = $("<div>", {class: "headerContainer"})
    //
    // APPEND NAME to PLAYER
    if (playerList[player].pitching.length != 0) {
      $name.text(playerList[player].namefirst + " " + playerList[player].namelast + " (Pitcher)");
    } else {
      $name.text(playerList[player].namefirst + " " + playerList[player].namelast);
    }
    $player.append($name);
    //
    // STATS HEADER
    if (playerList[player].batting.length != 0) {

      var battingColHeaders = ["YEAR","HITS","RUNS","H.RUNS","RBI","S.BASES", ""];
      for (var i = 0; i < 7; i++){
        $div = $("<div>", {class: "headerName"});
        $div.text(battingColHeaders[i]);
        $headerContainer.append($div);
        $headerContainer.addClass("battingHeader");
      }
      $player.append($headerContainer);
      // STATS
      //

      for (var year in playerList[player].batting) {
        var yearNum = playerList[player].batting[year].yearid;
        var hits = playerList[player].batting[year].h;
        var runs = playerList[player].batting[year].r;
        var h_runs = playerList[player].batting[year].hr;
        var rbis = playerList[player].batting[year].rbi;
        var s_bases = playerList[player].batting[year].sb;

        var $statsContainer = $("<div>", {class: "statsContainer"})
        var $year = $("<div>", {class: "year stats"}).text(yearNum);
        var $hits = $("<div>", {class: "hits stats"}).text(hits);
        var $runs = $("<div>", {class: "runs stats"}).text(runs);
        var $h_runs = $("<div>", {class: "h_runs stats"}).text(h_runs);
        var $rbis = $("<div>", {class: "rbis stats"}).text(rbis);
        var $s_bases = $("<div>", {class: "s_bases stats"}).text(s_bases);
        var $draft_button = $("<button>", {class: "button-primary draft_button", onclick: "draftPlayer(\"" + playerList[player].playerid + "\"," + yearNum + ")"}).text("draft");

        $statsContainer.append($year);
        $statsContainer.append($hits);
        $statsContainer.append($runs);
        $statsContainer.append($h_runs);
        $statsContainer.append($rbis);
        $statsContainer.append($s_bases);
        $statsContainer.append($draft_button);
        $player.append($statsContainer);
      }
    }
  //
    if (playerList[player].pitching.length != 0) {
      var pitchingColHeaders = ["YEAR","WINS","WALKS","K","ERA","SAVES", ""];
      for (var i = 0; i < 7; i++){
        $div = $("<div>", {class: "headerName"});
        $div.text(pitchingColHeaders[i]);
        $pitchingheaderContainer.append($div);
        $pitchingheaderContainer.addClass("pitchingHeader");

      }
      $player.append($pitchingheaderContainer);

      for (var year in playerList[player].pitching) {
        var yearNum = playerList[player].pitching[year].yearid;
        var wins = playerList[player].pitching[year].w;
        var bb = playerList[player].pitching[year].bb;
        var k = playerList[player].pitching[year].so;
        var era = playerList[player].pitching[year].era;
        var sv = playerList[player].pitching[year].sv;

        var $statsContainer = $("<div>", {class: "statsContainer"})
        var $year = $("<div>", {class: "year stats"}).text(yearNum);
        var $wins = $("<div>", {class: "wins stats"}).text(wins);
        var $bb = $("<div>", {class: "bb stats"}).text(bb);
        var $k = $("<div>", {class: "k stats"}).text(k);
        var $era = $("<div>", {class: "era stats"}).text(era);
        var $sv = $("<div>", {class: "sv stats"}).text(sv);
        var $draft_button = $("<button>", {class: "button-primary draft_button", onclick: "draftPitcher(\"" + playerList[player].playerid + "\"," + yearNum + ")"}).text("draft");

        $statsContainer.append($year);
        $statsContainer.append($wins);
        $statsContainer.append($bb);
        $statsContainer.append($k);
        $statsContainer.append($era);
        $statsContainer.append($sv);
        $statsContainer.append($draft_button);
        $player.append($statsContainer);
      }
    }
    //
    // ADD TO PAGE with CLICK FUNCTION to COLLAPSE HISTORY

    $draftList.append($player);
    //
    // ADD EVENT TO COLLAPSE ON CLICK
    createClickEvent_collapse($player, $name);
  }
}

function updateDraftedBatterList(draftedList) {
  $("#draftedBatters").empty();
  $header = $("<div>", {class: "drafted_list_header"});
  $header.text("DRAFTED BATTERS");
  $("#draftedBatters").append($header);
  var numBatters = 0;
  for (var i = 0; i < 100; i++) {
    if (draftedList["player" + i + "_id"] != undefined) {
      $playerContainer = $("<div>", {class: "drafted_player"});
      $player = $("<div>", {class: "drafted_player_name drafted_list"});
      $year = $("<div>", {class: "drafted_player_year drafted_list"});
      $player.text(draftedList["player" + i + "_id"]);
      $year.text(draftedList["player" + i + "_yearid"]);
      $playerContainer.append($player);
      $playerContainer.append($year);
      $("#draftedBatters").append($playerContainer);
      numBatters++;
      if (numBatters == 9) {
        displayDraftComplete(numBatters);
      }
    }
  }
}

function updateDraftedPitcherList(draftedList) {
  $("#draftedPitchers").empty();
  $header = $("<div>", {class: "drafted_list_header"});
  $header.text("DRAFTED PITCHERS");
  $("#draftedPitchers").append($header);
  for (var i = 0; i < 100; i++) {
    if (draftedList["pitcher" + i + "_id"] != undefined) {
      $playerContainer = $("<div>", {class: "drafted_player"});
      $player = $("<div>", {class: "drafted_player_name drafted_list"});
      $year = $("<div>", {class: "drafted_player_year drafted_list"});
      $player.text(draftedList["pitcher" + i + "_id"]);
      $year.text(draftedList["pitcher" + i + "_yearid"]);
      $playerContainer.append($player);
      $playerContainer.append($year);
      $("#draftedPitchers").append($playerContainer);
    }
  }
}

function displayDraftComplete (){
  // var $draft_complete = $("<button>", {class: "button-primary draft_button", onclick: "draftPlayer(\"" + playerList[player].playerid + "\"," + yearNum + ")"}).text("draft");
  // $("#draftedBatters").prepend()
}

function createClickEvent_collapse(playerDiv, nameDiv) {
  nameDiv.click(function(){
    //
    //
    playerDiv.find(".stats").css("display", "none");
    playerDiv.children(".statsContainer").delay(20).animate({height: "0px"}, 200);
    //
    //
    nameDiv.off();
    createClickEvent_expand(playerDiv, nameDiv);
  })
}

function createClickEvent_expand(playerDiv, nameDiv){
  nameDiv.click(function(){
    //
    //
    playerDiv.find(".stats").css("display", "inline-block");
    playerDiv.children(".statsContainer").animate({height: "24px"}, 200),
    //
    //
    nameDiv.off();
    createClickEvent_collapse(playerDiv, nameDiv);
  })
}
