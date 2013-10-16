'use strict';
var Cocktail = require('cocktail')
  , _ = require('lodash')
  , dbc = require('dbc.js')
  , DefaultKeyStrategy = require('./strategies/key')
  ;


Cocktail.mix({
  '@exports': module,
  '@as': 'class',
  keyGeneration: new DefaultKeyStrategy(),
  constructor: function (options) {
    options = options || {};
    this.keyName = options.keyName || "id";
  },
  all: function () {
    console.log('called all() on storage');
  },
  getByKey: function (key) {
    dbc([key], 'Key is required');
    console.log('called getByKey() on storage');
  },
  query: function (predicate) {
    console.log('called query() on storage');
  },
  save: function (entity) {
    dbc([entity, typeof entity === 'object'], 'Entity is required and must be an object');
    if (!entity[this.keyName]) {
      entity[this.keyName] = this.keyGeneration.generate();
      dbc([entity[this.keyName]], 'Error generating key');
    }
  },
  remove: function (key) {
    dbc([key], 'Key is required');
  },
  removeAll: function () {

  },
  exists: function (key) {
    dbc([key], 'Key is required');
  }
});