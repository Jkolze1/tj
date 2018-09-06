// HTML Route

var db = require("../models");
var path = require("path");
// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
    console.log("isAuthenticated: Passed");
		return next();
  }
	// if they aren't redirect them to the home page
	res.redirect('/');
}
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    console.log(req.user);
    res.sendFile(path.join(__dirname, `../public/index.html`), err=>{
      if(err){
        console.log(err);
        throw new Error(`Error sending index.html page: ${err}`);
      }
    });
  });
  
  app.get("/login", (req, res)=>{
    console.log(req.user);
    res.sendFile(path.join(__dirname, `../public/login.html`), err=>{
      if(err){
        throw new Error(`Error sending login.html page: ${err}`);
      }
    });
  });

  app.get("/signup", function(req, res) {
    console.log(req.user);
    res.sendFile(path.join(__dirname, `../public/signup.html`), err=>{
      if(err){
        console.log(err);
        throw new Error(`Error sending signup.html page: ${err}`);
      }
    });
  });

    // Load Search page
  app.get("/search",isLoggedIn, (req, res)=>{
    res.status(200);
    res.sendFile(path.join(__dirname, "../public/search.html"), err=>{
      if(err){
        throw new Error(`Could not retrieve search.html: ${err}`);
      }
    });
  });
