'use strict';
var Cocktail = require('cocktail')
  , dbc = require('dbc.js')
  , uuid = require('node-uuid')
  ;

Cocktail.mix({
  '@exports': module,
  '@as': 'class',
  generate: function () {
    var key = uuid.v4();
    dbc([key], "Key should not be null");
    return key;
  }
});