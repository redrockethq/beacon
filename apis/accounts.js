'use strict';
var app = require('../index')
  ;

app.get('/api/v1/accounts', function (req, res, next) {
  res.send({
    "name": "Tyler"
  });
});