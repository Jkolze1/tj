
// Passport stuff
module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
  
    // if they aren't redirect them to the home page
    res.redirect('/');
  };

  // Food 2 fork api
function submitHandler() {
  $("#cardDeck").empty();
    var food1 = document.getElementById("num1").value;
         
    var patt = new RegExp("/^[a-zA-Z]+$/");
    var res = patt.test(food1);

    if (!/^[a-zA-Z]+$/.test(food1)){
      $("#cardDeck").html("Not letters! Try again!");
    }

    else {
    $("#cardDeck").empty();
    var apikey = "637cf9cc5a93de2763c8c4a918f292a1";
    var queryURL = "https://food2fork.com/api/search?key=" + apikey + "&q=" + food1 + ","
    console.log(queryURL);
    console.log(num1);

  // AJAX
  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = JSON.parse(response).recipes;
      console.log(JSON.parse(response));
      for (i = 0; i < 4; i++) {
        var foodImg = results[i].image_url;
        var foodLink = results[i].source_url;
        var title = results[i].title;
        console.log(foodImg);


         var actualImage = $("<img>");
        actualImage.attr({class: "card-img-top", "src": foodImg, width: "250", height: "200", id: "img" + (i+1)});
        var imgLink = $("<a>");
        imgLink.attr({"href": foodLink, target: "_blank"});

        var titleLink = $("<h5 class='card-title'>" + title + "</h5>");
        var caption =$("<div>");
        caption.attr({class: "caption"});
        console.log(title);
        console.log (titleLink);
        var cardBody = $("<div class='card-body'>")
        var card = $("<div class='card border-success'>");
        card.append( actualImage, cardBody, caption, titleLink);
        $("#cardDeck").append(card);

        $("#img" + (i+1)).wrap(imgLink);
         ;
      }
    });

    }
};
};
;