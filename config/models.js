'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.Types.ObjectId
  , hat = require('hat')
  , moment = require('moment')
  ;

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
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: moment(), required: true },
  updatedAt: { type: Date },
  accounts: [
    { type: ObjectId, ref: 'Account' }
  ]
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

module.exports = {
  Account: mongoose.model('Account', accountSchema),
  User: mongoose.model('User', userSchema),
  Event: mongoose.model('Event', eventSchema)
};