var express = require('express')
  , fs = require('fs')
  , path = require('path')
  , loader = require('minioc-loader')({ basePath: __dirname})
  ;


var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , app = express()
  , minioc = loader.minioc
  , container = minioc.root
  ;

container.register('app').as.value(app);
container.register('config').as.singleton.value(config);

loader.loadSync(container, "./app");
loader.loadSync(container, './config');


minioc.fulfill('main', function ($app, $config) {
  var port = process.env.PORT || 3000;
  $app.listen(port);
  console.log('Express app started on port ' + port);
});

exports = module.exports = app;