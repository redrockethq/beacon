'use strict';
var Cocktail = require('cocktail')
  , AbstractRepository = require('./abstractRepository')
  ;

Cocktail.mix({
  '@exports': module,
  '@extends': AbstractRepository,
  '@as': 'class',
  constructor: function (options) {
    options = options || {};

    this.callSuper('constructor', {
      bucket: 'beacon-accounts'
    });
  }
});
