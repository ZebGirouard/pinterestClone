'use strict';

var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');
var twitterConfig = require('./twitter');
//var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport) {

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });
    
	passport.use('twitter', new TwitterStrategy({
	    consumerKey     : twitterConfig.apikey,
	    consumerSecret  : twitterConfig.apisecret,
	    callbackURL     : twitterConfig.callbackURL
	  },
	  function(token, tokenSecret, profile, done) {
	    // make the code asynchronous
	    // User.findOne won't fire until we have all our data back from Twitter
	    process.nextTick(function() { 
	 
	      User.findOne({ 'twitter.id' : profile.id }, 
	        function(err, user) {
	          // if there is an error, stop everything and return that
	          // ie an error connecting to the database
	          if (err)
	            return done(err);
	 
	            // if the user is found then log them in
	            if (user) {
	               return done(null, user); // user found, return that user
	            } else {
	               // if there is no user, create them
	               var newUser                 = new User();
	 
	               // set all of the user data that we need
	               newUser.twitter.id          = profile.id;
	               newUser.twitter.token       = token;
	               newUser.twitter.username = profile.username;
	               newUser.twitter.displayName = profile.displayName;
	               newUser.twitter.lastStatus = profile._json.status.text;
	 
	               // save our user into the database
	               newUser.save(function(err) {
	                 if (err)
	                   throw err;
	                 return done(null, newUser);
	               });
	            }
	         });
	      });
	    })
	);	
	/*
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };

	// Generates hash using bCrypt
	var createHash = function(password){
	 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
    
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	
	passport.use('login', new LocalStrategy({
	    passReqToCallback : true
	  },
	  function(req, username, password, done) { 
	    // check in mongo if a user with username exists or not
	    User.findOne({ 'username' :  username }, 
	      function(err, user) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        if (!user){
	          console.log('User Not Found with username '+username);
	          return done(null, false, 
	                req.flash('message', 'User Not found.'));                 
	        }
	        // User exists but wrong password, log the error 
	        if (!isValidPassword(user, password)){
	          console.log('Invalid Password');
	          return done(null, false, 
	              req.flash('message', 'Invalid Password'));
	        }
	        // User and password both match, return user from 
	        // done method which will be treated like success
	        return done(null, user);
	      }
	    );
	}));
	
	passport.use('signup', new LocalStrategy({
	    passReqToCallback : true
	  },
	  function(req, username, password, done) {
	    var findOrCreateUser = function(){
	      // find a user in Mongo with provided username
	      User.findOne({'username':username},function(err, user) {
	        // In case of any error return
	        if (err){
	          console.log('Error in SignUp: '+err);
	          return done(err);
	        }
	        // already exists
	        if (user) {
	          console.log('User already exists');
	          return done(null, false, 
	             req.flash('message','User Already Exists'));
	        } else {
	          // if there is no user with that email
	          // create the user
	          var newUser = new User();
	          // set the user's local credentials
	          newUser.username = username;
	          newUser.password = createHash(password);
	          newUser.email = req.param('email');
	          newUser.firstName = req.param('firstName');
	          newUser.lastName = req.param('lastName');
	 
	          // save the user
	          newUser.save(function(err) {
	            if (err){
	              console.log('Error in Saving user: '+err);  
	              throw err;  
	            }
	            console.log('User Registration succesful');    
	            return done(null, newUser);
	          });
	        }
	      });
	    };
	     
	    // Delay the execution of findOrCreateUser and execute 
	    // the method in the next tick of the event loop
	    process.nextTick(findOrCreateUser);
	  }
	));
	*/
};
