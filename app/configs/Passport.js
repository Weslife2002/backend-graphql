/* eslint-disable import/extensions */
import passport from 'passport';
import passpostGoogle from 'passport-google-oauth20';
import passportFacebook from 'passport-facebook';
import { UserAccount } from '../models/index.js';

const handleGoogleCallback = async (accessToken, _, tokenDetail, profile, done) => {
  const email = profile.emails[0].value;
  UserAccount.findOne({ email, connectGoogle: true }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      UserAccount.findOne({ email }).then(user => {
        if (!user) {
          new User({ email, connectGoogle: true }).save()
            .then(newUser => { done(null, newUser); });
        } else {
          UserAccount.updateOne({ email }, { connectGoogle: true })
            .then(updatedUser => { done(null, updatedUser); });
        }
      });
    }
  });
};

const handleFacebookCallback = async (accessToken, _, tokenDetail, profile, done) => {
  const email = profile.emails[0].value;
  UserAccount.findOne({ email, connectFacebook: true }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      UserAccount.findOne({ email }).then(user => {
        if (!user) {
          new UserAccount({ email, connectFacebook: true }).save()
            .then(newUser => { done(null, newUser); });
        } else {
          UserAccount.updateOne({ email }, { connectFacebook: true })
            .then(updatedUser => { done(null, updatedUser); });
        }
      });
    }
  });
};

const configPassport = () => {
// Using google Authentication.
  const GoogleStrategy = passpostGoogle.Strategy;
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  }, handleGoogleCallback));

  const FacebookStrategy = passportFacebook.Strategy;
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['email'],
  }, handleFacebookCallback));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((email, done) => {
    UserAccount.find({ email })
      .then(user => { done(null, user); });
  });
};

export default configPassport;
