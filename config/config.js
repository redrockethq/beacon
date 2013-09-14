'use strict';

var path = require('path'),
  rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: "mongodb://redrocket:orange5@paulo.mongohq.com:10090/beacon-development",
    root: rootPath,
    app: {
      name: 'Beacon'
    }
  },
  test: {
    db: "",
    root: rootPath,
    app: {
      name: 'Beacon'
    }
  },
  production: {
    db: "mongodb://redrocket:orange5@paulo.mongohq.com:10090/beacon-development",
    root: rootPath,
    app: {
      name: 'Beacon'
    }
  }
};