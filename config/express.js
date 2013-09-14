'use strict';
var express = require('express');


module.exports = function $init($app, $config) {

  $app.set('showStackError', true);
  $app.use(express.favicon());
  $app.use(express.bodyParser());
  $app.use(express.methodOverride());
  $app.use(express.compress());

  if (process.env.NODE_ENV !== 'test') {
    $app.use(express.logger('dev'));
  }

  $app.set('views', $config.root + '/app/views');
  $app.set('view engine', 'ejs');
  $app.use(require('less-middleware')({ src: __dirname + '/public' }));
  $app.use(express.static($config.root + '/public'));

  $app.use($app.router);
};