// var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var User = require('../../db/Models/User');
// var configAuth = require('./facebookAuth');

// module.exports = function(passport) {

// 	passport.serializeUser(function(user, done){
// 		done(null, user.id);
// 	});

// 	passport.deserializeUser(function(id, done){
// 		User.findById(id, function(err, user){
// 			done(err, user);
// 		});
// 	});

// 	passport.use(new FacebookStrategy({
// 	    clientID: configAuth.facebookAuth.clientID,
// 	    clientSecret: configAuth.facebookAuth.clientSecret,
// 	    callbackURL: configAuth.facebookAuth.callbackURL 
// 	  },
// 	  function(accessToken, refreshToken, profile, done) {
// 			done(null, profile);
	    	
// 	    	process.nextTick(function(){
// 	    		User.findOne({'facebook.id': profile.id}, function(err, user){
// 	    			if(err)
// 	    				return done(err);
// 	    			if(user)

// 	    				return done(null, user);
// 	    			else {
// 	    				var newUser = new User();
// 	    				newUser.user.fb_id = profile.id;
// 	    				newUser.user.fb_token = accessToken;
// 	    				newUser.user.fb_name = profile.name.givenName + ' ' + profile.name.familyName;
// 	    				newUser.user.fb_email = profile.emails[0].value;
// 	    				newUser.save(function(err){
// 	    					if(err)
// 	    						throw err;
// 	    					return done(null, newUser);
// 	    				})
// 	    				console.log(profile);
// 	    			}
// 	    		});
// 	    	});
// 	    }
// 	));
// };