'use strict';

var path = process.cwd();
var PinHandler = require(path + '/app/controllers/handler.server.js');

module.exports = function (app, passport) {

	var pinHandler = new PinHandler();

	// As with any middleware it is quintessential to call next()
	// if the user is authenticated
	
	var isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated()) {
	  	console.log("Authenticated!");
	    return next();/*
	    console.log("redirecting to home");
	  res.redirect('/');*/
	  }
	  else {
	  	console.log("Not authenticated!");
	  	return next();
	  }
	};

	app.route('/:var(myPins)?')
		.get(isAuthenticated, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/api/addPin')
		.post(pinHandler.addPin);

	app.route('/api/removePin')
		.post(pinHandler.removePin);
		
	app.route('/api/pins')
		.get(pinHandler.getPins);

	// route for twitter authentication and login
	// different scopes while logging in
	app.get('/login/twitter',  
	  passport.authenticate('twitter')
	);
	 
	// handle the callback after facebook has authenticated the user
	app.get('/login/twitter/callback',
	  passport.authenticate('twitter', {
	    successRedirect : '/',
	    failureRedirect : '/'
	  })
	);
	/* Handle Logout */
	app.get('/signout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});		

};
