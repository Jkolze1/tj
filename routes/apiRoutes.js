// API route

// Passport stuff
require("dotenv");
var db = require("../models");
const request = require("request");

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      return next();
  
    // if they aren't redirect them to the home page
    res.redirect('/');
  };

  // User Favorites
   app.get("/api/:userID/favorites", isLoggedIn, (req, res)=>{
    db.Favorites.findAll({
      attributes: [""],
      where: {
        UserId: req.params.userID,
      },
    }).then(function(results){
      res.status(200);
      res.json(results);
    }).catch(err=>{
      throw new Error(``);
    });
  });

  // Creating a new User and Logging them in
  app.post('/signup', (req, res, next) => {
    console.log('Inside POST /signin callback')
    passport.authenticate('local-signup', (err, user, info) => {
      console.log('Inside passport.authenticate() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, err=> {
        console.log('Inside req.login() callback')
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        res.status(200).json(req.user.username);
      });
    })(req, res, next);
  })
// Log in post route
  app.post('/login', (req, res, next)=>{
    console.log('Inside POST /signin callback')
    passport.authenticate('local-signup', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        req.login(user, (err) => {
            console.log('Inside req.login() callback')
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
            console.log(`req.user: ${JSON.stringify(req.user)}`)
            res.status(200).json(req.user);
        });
    })(req, res, next);
  });
}

// Food2Fork API Info