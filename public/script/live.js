//
//
function resetDraftPlayerList() {
  $(".draftPlayer").empty();
}

function updateDraftPlayerList(playerList){
  //
  var $draftList = $("#draftList");
  console.table(playerList);
  //
  for (var player in playerList) {
    // construct divs for players in list
    var $player = $("<div>", {id: playerList[player].playerid, class: "draftPlayer"});
    var $name = $("<div>", {class: "playerName"});
    var $headerContainer = $("<div>", {class: "headerContainer"})
    //
    // APPEND NAME to PLAYER
    $name.text(playerList[player].namefirst + " " + playerList[player].namelast);
    $player.append($name);
    //
    // STATS HEADER
    var battingColHeaders = ["YEAR","HITS","RUNS","H.RUNS","RBI","S.BASES", "DRAFT"];
    for (var i = 0; i < 7; i++){
      $div = $("<div>", {class: "headerName"});
      $div.text(battingColHeaders[i]);
      $headerContainer.append($div);
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
      var $draft_button = $("<button>", {class: "draft_button stats", onclick: "draftPlayer(\"" + playerList[player].playerid + "\"," + yearNum + ")"}).text("draft");

      $statsContainer.append($year);
      $statsContainer.append($hits);
      $statsContainer.append($runs);
      $statsContainer.append($h_runs);
      $statsContainer.append($rbis);
      $statsContainer.append($s_bases);
      $statsContainer.append($draft_button);
      $player.append($statsContainer);
    }
    //
    // ADD TO PAGE with CLICK FUNCTION to COLLAPSE HISTORY

    $draftList.append($player);
    //
    // ADD EVENT TO COLLAPSE ON CLICK
    createClickEvent_collapse($player, $name);
  }
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

// function createClickEvent_collapse(playerDiv, nameDiv) {
//   nameDiv.click(function(){
//     for (var n = 0; n < 20; n++) {
//       if (playerDiv.children(".statsContainer").eq(n).is("statsContainer")) {
//         playerDiv.children(".statsContainer").eq(n).addClass("collapseContainer");
//         playerDiv.children(".statsContainer").eq(n).removeClass("statsContainer");
//       } else {
//         playerDiv.children(".collapseContainer").eq(n).addClass("statsContainer");
//         playerDiv.children(".collapseContainer").eq(n).removeClass("collapseContainer");
//       }
//     }
//   })
// }
