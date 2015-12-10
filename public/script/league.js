$(document).ready(function(){
  getLeagues(); // ajax call in league_ajax.js
}); //end of document.ready

function createLeagueList(leagueList){
  //
  for (var league in leagueList) {
    // if (leagueList[league].draftcomplete) {
    //   addLeagueToList(leagueList[league].league_name, true);
    // } else {
    //   addLeagueToList(leagueList[league].league_name, false);
    // }
    if (Math.random() > .5) {
      addLeagueToList(leagueList[league].league_name, true);
    } else {
      addLeagueToList(leagueList[league].league_name, false);
    }
  }
}

function addLeagueToList(name, draftComplete) {
  //
  $league = $("<div>", {id: name, class: "leagueName"});
  $league.text(name);
  $buttonDetail = $("<input>", {type: "submit", name: "detail", value: "VIEW/SIM LEAGUE", class: "button-primary buttonLeague detail"});
  $buttonDraft = $("<input>", {type: "submit", name: "draft", value: "DRAFT NOW!", class: "button-primary buttonLeague draft"});
  //
  if (draftComplete) {
    $league.append($buttonDetail);
    $("#drafted").append($league);
  } else {
    $league.append($buttonDraft);
    $("#notDrafted").append($league);
  }

}
//
// function addDraftedLeague(name){
//   //
//   $league = $("<div>" {id: name, class: "leagueName"});
//   $buttonLeagueDetail = $("<input>" {class: "button-primary buttonLeague detail"});
//   //
//   $league.append($buttonLeagueDetail);
//   $leagueDraftedList.append($league);
// }
//
// function addNotDraftedLeague(name){
//   //
//   $league = $("<div>" {id: name, class: "leagueName"});
//   $buttonLeagueDraft = $("<input>" {class: "button-primary buttonLeague draft"});
//   //
//   $league.append($buttonLeagueDraft);
//   $leagueNotDraftedList.append($league);
// }
