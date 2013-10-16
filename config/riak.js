'use strict';

var riak = require('riak-js')
  , nconf = require('nconf').file({ file: 'config/settings.json'}).env()
  ;

var db = riak.getClient({
  host: nconf.get('host')
});

module.exports = db;