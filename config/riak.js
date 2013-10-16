'use strict';

var riakjs = require('riak-js')
  , nconf = require('nconf').file({ file: 'config/settings.json'}).env()
  ;

var db = riakjs.getClient({
  host: nconf.get('host')
});

module.exports = db;