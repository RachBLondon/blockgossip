const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const env = require('env2')('./../config.env');


const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.ENV === 'LOCAL' ? "/auth/google/callback" : "https://blockgossip-dev.herokuapp.com/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          //dont need to create a new record
          done(null, existingUser);
        } else {
          new User({ googleID: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
