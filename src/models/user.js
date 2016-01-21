var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var oAuthTypes = [
  'facebook',
  'twitter',
  'google',
  'github',
  'linkedin'
]

/**
 * User Schema
 */

var UserSchema = new Schema({
  userId: {type: Number, unique: true, index: true},
  name: {type: String, default: ''},
  email: {type: String, default: '', unique: true, index: true},
  username: {type: String, default: '', unique: true, index: true},
  gender: String,
  dayOfBirth: {type: Date, default: new Date()},
  joinOn: {type: Date, default: new Date()},
  provider: {type: String, default: ''},
  hashed_password: {type: String, default: ''},
  salt: {type: String, default: ''},
  authToken: {type: String, default: ''},
  facebook: {},
  twitter: {},
  google: {},
  linkedin: {},
  github: {}
});

/**
 * Virtuals
 */
