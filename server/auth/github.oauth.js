'use strict()';
var dotenv = require('dotenv').config();
var router = require('express').Router();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var User = require('../api/users/user.model');

router.get('/', passport.authenticate('github'));

router.get('/callback', passport.authenticate('github', {
	successRedirect: '/stories',
	failureRedirect: '/signup'
}));

passport.use(new GitHubStrategy({
	clientID: process.env.GH_client,
	clientSecret: process.env.GH_secret,
	callbackURL: 'http://127.0.0.1:8080/auth/github/callback'
}, function (token, refreshToken, profile, done) {
	User.findOne({'github.id': profile.id }, function (err, user) {
		if (err) done(err);
		else if (user) done(null, user);
		else {
			var email = profile.emails ? profile.emails[0].value : (profile.displayName.replace(/\s+/g, '_') + '@fake-auther-email.com');
			var email = profile.emails[0].value;
			User.create({
				email: email,
				name: profile.displayName,
				github: {
					id: profile.id,
					name: profile.displayName,
					email: email,
					token: token
				}
			}, done);
		}
	});
}));

module.exports = router;
