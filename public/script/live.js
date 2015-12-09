//
//
function updateDraftPlayerList(playerList){
  //
  $draftList = $("#draftList");
  console.table(playerList);
  //
  for (var i in playerList) {
    // construct divs for players in list
    var $player = $("<div>", {id: playerList[i].playerid, class: "draftPlayer"});
    var $name = $("<div>", {class: "playerName"});
    var $stats = $("<div>", {class: "stats"});

    $name.html(playerList[i].namefirst + " " + playerList[i].namelast);
    for (var y in playerList[i.batting]){
      
    }

    $stats.html();
    //
    // add divs to player then to page
    $player.append($name);
    $player.append($stats);
    $draftList.append($player);
  }
}



//
//
// function updateDraftPlayerList(playerList){
//   var playerList = playerList;
//
//
//   for (var i in playerList) {
//     $('.liveDraft').append("<div id=\"" + playerList[i].playerid + "\">"+playerList[i].namefirst + " " + playerList[i].namelast + " </div>");
//     for (var j in playerList[i].batting) {
//       $('#' + playerList[i].playerid).append("<li>Year: " + playerList[i].batting[j].yearid + " Hits:" + playerList[i].batting[j].h + " Runs:" + playerList[i].batting[j].r + " Home Runs:" + playerList[i].batting[j].hr + " RBIs:" + playerList[i].batting[j].rbi + " Stolen Bases:" + playerList[i].batting[j].sb + " <button id=\"" + playerList[i].playerid + "," + playerList[i].batting[j].yearid +  "\" onclick=\"draftPlayer(" + "\'" + playerList[i].playerid + "\'" + "," + playerList[i].batting[j].yearid + ");\">Draft</button>" + "</li>");
//     }
//   }
// }
