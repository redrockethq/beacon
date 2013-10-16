'use strict';
var Cocktail = require('cocktail')
  , _ = require('lodash')
  , dbc = require('dbc.js')
  , Storage = require('./storage')
  , nconf = require('nconf').file({ file: 'config/settings.json'}).env()
  , riak = require('riak-js')
  ;

Cocktail.mix({
  '@exports': module,
  '@extends': Storage,
  constructor: function (options) {
    options = options || {};
    this.bucket = options.bucket;
    this.db = riak.getClient({ host: nconf.get('host')});

    dbc([this.bucket], "Bucket is required");
    dbc([this.db], 'Riak Client is required');
  },

  all: function (options, callback) {
    var self = this;
    options = options || {};
    self.callSuper('all');
    self.db.getAll(this.bucket, options, callback);
  },
  getByKey: function (key, options, callback) {
    var self = this;
    options = options || {};
    self.callSuper('getByKey', key);
    self.db.get(this.bucket, key, options, callback);
  },
  save: function (entity, options, callback) {
    var self = this;
    options = options || {
      returnbody: true
    };
    self.callSuper('save', entity);
    db.save(this.bucket, entity[this.keyName], entity, options, callback);
  },
  query: function (predicate, options, callback) {
    var self = this;
    options = options || {};
    self.callSuper('query', predicate);
    self.db.query(self.bucket, predicate, options, callback);
  },
  remove: function (key, options, callback) {
    var self = this;
    options = options || {}
    self.callSuper('remove', key);
    db.remove(self.bucket, key, options, callback);
  },
  removeAll: function () {
    var self = this;
    db.keys(this.bucket, { keys: 'stream' })
      .on('keys', function (keys) {
        if (keys.length > 0) {
          var key = keys[0];
          db.remove(this.bucket, key, {}, function (err) {
            if (err) {
              throw new Error(err);
            }
          });
        }
      })
      .start()
  },
  exists: function (key, options, callback) {
    var self = this;
    options = options || {};
    self.callSuper('exists', key);
    self.exists(self.bucket, key, options, callback);
  }
});