//
// Initialize and load draft with random players
// create button for each player
$.ajax({
  url: '/draft/random',
  type: 'GET',
  dataType: 'json',
  })
  //
  .done(function(data) {
    updateDraftPlayerList(data);
  })
  //
  .fail(function() {
    // console.log("error");
  })
  //
  .always(function() {
    // console.log("complete");
  });

//
//
function draftPlayer(name,year) {
  var playerSelected = {
    name: name,
    year: year
  };
  // console.log(playerSelected;
  //
  $.ajax({
    url: '/draft/select',
    type: 'POST',
    dataType: 'json',
    data: playerSelected
  })
  .done(function (data) {
    // console.log(data);
    // console.log(JSON.stringify(data));
  })
  .fail(function (data) {
    // console.log(data);
  });
}

function playerSearch(searchterm) {
  var searchurl = '/draft/search/' + searchterm;
  $.ajax({
    url: searchurl,
    type: 'GET',
    dataType: 'json',
    })
    //
    .done(function(data) {
      resetDraftPlayerList();
      updateDraftPlayerList(data);
      console.log("done");
    })
    //
    .fail(function() {
      console.log("error");
    })
    //
    .always(function() {
      console.log("complete");
    });
}
