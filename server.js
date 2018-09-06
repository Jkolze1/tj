var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var passport = require("passport");

// Port
var PORT = process.env.PORT || 3000;


// Starting the server, syncing our models ------------------------------------/ 
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
  app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html'); // change the path to your index.html
});

module.exports = app;
