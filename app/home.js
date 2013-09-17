'use strict';

module.exports = function $init($app) {

  $app.get('/', function (req, res) {
    res.render('index.ejs');
  });

};