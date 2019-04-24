const { ExtractJwt, Strategy } = require('passport-jwt');
const mongoose = require('mongoose');

const User = mongoose.model('users');

const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.JWT_SECRET;

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
    }),
  );
};
