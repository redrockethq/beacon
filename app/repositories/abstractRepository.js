'use strict';
var Cocktail = require('cocktail')
  , dbc = require('dbc.js')
  , MemoryStorage = require('./storage/memory')
  ;

Cocktail.mix({
  '@exports': module,
  '@as': 'class',

  constructor: function (options) {
    options = options || {};

    this.bucket = options.bucket;
    dbc([this.bucket], 'Bucket is required');

    this.storage = options.storage;
    dbc([this.storage], "Storage is required");

  },
  all: function (callback) {
    this.storage.all(callback);
  },
  getByKey: function (key, callback) {
    this.storage.getByKey(key, callback);
  },
  query: function (predicate, callback) {
    this.storage.query(predicate, callback);
  },
  save: function (entity, callback) {
    this.storage.save(entity, callback);
  },
  remove: function (key, callback) {
    this.storage.remove(key, callback);
  },
  removeAll: function (callback) {
    this.storage.removeAll(callback);
  },
  exists: function (key, callack) {
    this.storage.exists(key, callback);
  }
});
