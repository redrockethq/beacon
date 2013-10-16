'use strict';
var Cocktail = require('cocktail')
  , _ = require('lodash')
  , dbc = require('dbc.js')
  , Storage = require('./storage')
  ;


Cocktail.mix({
  '@exports': module,
  '@extends': Storage,

  constructor: function (options) {
    options = options || {};
    this._data = options.initialData || [];
    this.callSuper('constructor', options);
  },
  _data: [],
  all: function (callback) {
    var self = this;
    self.callSuper('all');
    return callback(null, self._data);
  },
  getByKey: function (key, callback) {
    var self = this;
    self.callSuper('getByKey', key);
    var entity = _.find(self._data, self.keyName);
    if (entity) {
      callback(null, entity);
    } else {
      callback(new Error('Key not found'), null);
    }
  },
  save: function (entity, callback) {
    var self = this;
    self.callSuper('save', entity);
    self._data.push(entity);
    callback(null, entity);
  },
  query: function (predicate, callback) {
    var self = this;
    self.callSuper('query', predicate);
    var results = _.where(this._data, predicate);
    callback(null, results);
  },
  remove: function (key, callback) {
    var self = this;
    self.callSuper('remove', key);
    self.getByKey(key, function (err, entity) {
      if (!err && entity) {
        _.reject(self._data, entity);
        callback(null);
      } else {
        callback(new Error('Entity not found or there was an error'));
      }
    })
  },
  removeAll: function () {
    return [];
  },
  exists: function (key, callback) {
    this.callSuper('exists', key);
    return callback(null, _.some(this._data, key));
  }
});