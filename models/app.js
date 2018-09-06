
$(document).ready(function () {

  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });


  $("#submit").on("click", function () {
    submitHandler();
    

  });
  $(document).on("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      submitHandler();
    }
  });
  

});
function submitHandler() {
  $("#cardDeck").empty();
    var food1 = document.getElementById("num1").value;
    var food2 = document.getElementById("num2").value;
    var food3 = document.getElementById("num3").value;
    var food4 = document.getElementById("num4").value;
    var food5 = document.getElementById("num5").value;
     
    var patt = new RegExp("/^[a-zA-Z]+$/");
    var res = patt.test(food1);

    if (!/^[a-zA-Z]+$/.test(food1)){
      $("#cardDeck").html("Not letters! Try again!");
    }
    else {
      $("#cardDeck").empty();
      var apikey = "637cf9cc5a93de2763c8c4a918f292a1";
    var queryURL = "https://food2fork.com/api/search?key=" + apikey + "&q=" + food1 + "," + food2 + "," + food3 + "," + food4 + "," + food5;
    console.log(food2);
    console.log(queryURL);
    console.log(num1);


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


