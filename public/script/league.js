$(document).ready(function(){
  getLeagues(); // ajax call in league_ajax.js
}); //end of document.ready

function resetLeagueList() {
  $("#notDrafted").empty();
  $("#drafted").empty();
}

function clearFormData() {
  $("#createLeague")[0].reset();
}

function createLeagueList(leagueList){
  //
  for (var league in leagueList) {
    if (leagueList[league].draftcomplete) {
      addLeagueToView(leagueList[league].league_name, true, leagueList[league].id);
    } else {
      addLeagueToView(leagueList[league].league_name, false, leagueList[league].id);
    }
  }
}

function addLeagueToView(name, draftComplete, leagueid) {
  //
  $league = $("<div>", {id: name, class: "leagueName"});
  $league.text(name);
  $buttonDetail = $("<input>", {type: "submit", name: "detail", value: "VIEW / SIMULATE", class: "button-primary buttonLeague detail"});
  $buttonDraft = $("<input>", {type: "submit", name: "draft", value: "DRAFT NOW!", class: "button-primary buttonLeague draft"});
  $hiddenid = $("<input>", {type: "hidden", value: leagueid});
  $form_draft = $("<form>", {action: "/draft"}
  $form_detail = $("<form>", {action: "/myleagues/"})
  //
  if (draftComplete) {
    $league.append($buttonDetail);
    $("#drafted").append($league);
  } else {
    $league.append($buttonDraft);
    $("#notDrafted").append($league);
  }

}
