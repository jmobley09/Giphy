

// Var to hold name of object to pull
var Searches = ['hamster', 'parrot', 'fish'];

// creates buttons and add to page
function buttons() {
  for (var i = 0; i < Searches.length; i++) {
    var btnTag = $('<button>');

    btnTag.attr('name', Searches[i]);
    btnTag.append(Searches[i]);
    $('#game-buttons').append(btnTag);
  }
}
buttons();

$("button").on("click", function () {
  var SearchTerm = $(this).attr("name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    SearchTerm + "&api_key=qXR34Xj4g5cgE8V3Bza9Q07qHGQUybQR&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var results = response.data;
    console.log(results);
    // for loop that creates div and adds information recived from giphy
    for (var i = 0; i < results.length; i++) {

      var searchDiv = $('<div>');
      var p = $('<p>');
      p.text('Rating: ' + results[i].rating);

      // changes image settings of button that is clicked
      var searchImage = $('<img>');
      searchImage.attr('src', results[i].images.original.url);
      searchDiv.append(p);
      searchDiv.append(searchImage);
      searchDiv.addClass('gif');
      $('#gifs-appear-here').prepend(searchDiv);
      
    }



  });

});