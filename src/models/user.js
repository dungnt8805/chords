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
  activated: Boolean,
  activeCode: String,
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

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  }).get(function () {
    return this._password
  });

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
}

UserSchema.path('name').validate(function (name) {
  if (this.skipValidation()) {
    return true;
  }
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true;
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User');
  if (this.skipValidation()) fn(true);

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({email: email}).exec(function (err, users) {
      fn(!err && users.length === 0);
    });
  } else fn(true);
}, 'Email already exists');


UserSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true;
  return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true;
  return hashed_password.length;
}, 'Password cannot be blank');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/**
 * Methods
 */

UserSchema.methos = {
  /**
   * Make salt
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   *
   */

  encryptPassword: function () {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  /**
   * Validation is not required if using oAuth
   */
  skipValidation: function () {
    return ~oAuthTypes.indexOf(this.provider);
  },

  /**
   * Authenticate - check if password are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   *
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashed_password;
  }
}

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   *
   */
  load: function (options, cb) {
    options.select = options.select || 'name username';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

mongoose.model('User', UserSchema);