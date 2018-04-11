$(document).ready(function() {

  console.log("$(document).ready(function() { kod kod });");

});

$(function(){

  $.getJSON("/json/languages.json", function(response) {
    var langKeys = Object.keys(response.languages);

  });
});

(function($) {

  $.getJSON("/json/languages.json", function(response) {
    var langKeys = Object.keys(response.languages);

    for (var i=0; i<langKeys.length; i++) {
      $("#langList").append('<option class="list-group-item langs background" value="' + langKeys[i] + '">' + response.languages[langKeys[i]] + '</option>"');
    }

    $("#langList").on("click", "option", function() {

      $(this).detach().appendTo("#selectedLangs");
      $('#langList option').prop('selected', false);

    });

    $("#selectedLangs").on("click", "option", function() {

      $(this).detach().appendTo("#langList");
      $('#selectedLangs option').prop('selected', true);
      $('#langList option').prop('selected', false);

    });

  });

})(jQuery);
