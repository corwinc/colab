module.exports = {
  'facebookAuth' : {
    'clientID': 'enter client id here',
    'clientSecret': 'enter client secret here',
    'callbackURL': 'enter callback here'
  },

  // 'googleAuth' : {
  //   'clientID': 'enter client id here',
  //   'clientSecret': 'enter client secret here',
  //   'callbackURL': 'enter callback here'
  // }
}



















// var passport = require('passport')
//   , FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://www.example.com/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate(..., function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));