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
  $button_detail = $("<input>", {type: "submit", name: "detail", value: "VIEW / SIMULATE", class: "button-primary buttonLeague detail"});
  $button_draft = $("<input>", {type: "submit", name: "draft", value: "DRAFT NOW!", class: "button-primary buttonLeague draft"});
  $hiddenid = $("<input>", {type: "hidden", value: name, name: "league_name"});
  $form_draft = $("<form>", {class: "form", method: "GET", action: "/draft"});
  $form_detail = $("<form>", {class: "form", method: "GET", action: "/myleagues/:" + name + ""});
  //
  if (draftComplete) {
    $form_detail.append($hiddenid);
    $form_detail.append($button_detail);
    $league.append($form_detail);
    $("#drafted").append($league);
  } else {
    $form_draft.append($hiddenid);
    $form_draft.append($button_draft);
    $league.append($form_draft);
    $("#notDrafted").append($league);
  }

}
