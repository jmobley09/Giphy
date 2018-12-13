

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

      // changes image settings of populated gifs
      var searchImage = $('<img>');
      searchImage.attr('src', results[i].images.fixed_height.url);
      searchImage.attr('data-state', 'still');
      searchImage.attr('still-source', results[i].images.fixed_height_still.url);
      searchImage.attr('animate-source', results[i].images.fixed_height.url);
      searchImage.addClass('gif');
      // adds image and text to its own div
      searchDiv.append(p);
      searchDiv.append(searchImage);
      $('#gifs-appear-here').prepend(searchDiv);

    }

    $('.gif').on("click", function () {

      // Pulls attribute to see if the gif is playing or not
      var state = $(this).attr("data-state");

      // if image is playing and its clicked, it pauses
      // if image is still and its clicked, it plays

      if (state === "still") {
        $(this).attr("src", $(this).attr("animate-source"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("still-source"));
        $(this).attr("data-state", "still");
      }
    });

  });

});

