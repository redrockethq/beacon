'use strict';

var path = require('path'),
  rootPath = path.normalize(__dirname + '/..')
  , nconf = require('nconf').file({ file: 'config/settings.json'}).env();

module.exports = {
  development: {
    db: nconf.get('mongo'),
    root: rootPath,
    app: {
      name: 'Beacon'
    }
  },
  test: {
    db: nconf.get('mongo'),
    root: rootPath,
    app: {
      name: 'Beacon'
    }
  },
  production: {
    db: nconf.get('mongo'),
    root: rootPath,
    app: {
      name: 'Beacon'
    }
  }
};