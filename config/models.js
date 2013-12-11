'use strict';

var mongoose = require('mongoose')
  , crypto = require('crypto')
  , Schema = mongoose.Schema
  , ObjectId = Schema.Types.ObjectId
  , hat = require('hat')
  , moment = require('moment')
  ;

;

Schema.prototype.defineHashedPassword = function (algorithm, validate) {
  this.add({
    hashed_password: String, salt: String
  });

  this.virtual('password').set(function (pw) {
    this._password = pw;
    if (!this.salt) {
      this.salt = this.createSalt();
    }
    this.hashed_password = this.encryptPassword(pw);
  }).get(function () {
      return this._password;
    });

  this.methods.authenticate = function (plain) {
    return this.encryptPassword(plain) === this.hashed_password;
  };

  this.methods.createSalt = function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  };

  this.methods.encryptPassword = function (str) {
    return crypto.createHmac(algorithm, this.salt).update(str).digest('hex');
  };
};


var accountSchema = Schema({
  name: { type: String, required: true, trim: true  },
  slug: {type: String, unique: true, lowercase: true, required: true, trim: true },
  token: {type: String, unique: true, default: hat(), required: true },
  active: {type: Boolean, default: true },
  createdAt: {type: Date, default: moment(), required: true },
  updatedAt: { type: Date }
});

accountSchema.methods.users = function (cb) {
  return this.model('User').find({active: true}).populate('accounts').exec(cb);
};

var userSchema = Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, unique: true, trim: true},
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: moment(), required: true },
  updatedAt: { type: Date },
  accounts: [
    { type: ObjectId, ref: 'Account' }
  ]
});

userSchema.defineHashedPassword('sha256', function (value) {
  if (this.isNew) {
    return value && value.length >= 6;
  } else {
    if (value) {
      return value.length >= 6;
    } else {
      return true;
    }
  }
});

var eventSchema = Schema({
  account: { type: ObjectId, ref: 'Account'},
  application: { type: String, trim: true, default: 'unknown' },
  severity: {type: String, enum: ['critical', 'error', 'warning', 'info', 'verbose'], default: 'info'},
  tags: [String],
  user: {type: String, trim: true, default: 'system'},
  loc: { type: { type: String }, coordinates: [] },
  createdAt: {type: Date, default: moment(), required: true },
  _data: {type: Schema.Types.Mixed }
});
eventSchema.index({ loc: '2dsphere' });
//eventSchema.statics.paginate = function (q, pageNumber, resultsPerPage, callback) {
//  var model = this;
//  callback = callback || function () {
//  };
//
//  var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
//  var query = model.find(q).skip(skipFrom).limit(resultsPerPage);
//
//  query.exec(function (error, results) {
//    if (error) {
//      callback(error, null, null);
//    } else {
//      model.count(q, function (error, count) {
//        if (error) {
//          callback(error, null, null);
//        } else {
//          var pageCount = Math.floor(count / resultsPerPage);
//          if (pageCount == 0) // fix : 1 of 0
//            pageCount = 1;
//          callback(null, pageCount, results);
//        }
//      });
//    }
//  })
//};

module.exports = {
  Account: mongoose.model('Account', accountSchema),
  User: mongoose.model('User', userSchema),
  Event: mongoose.model('Event', eventSchema)
};