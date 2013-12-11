'use strict';
var express = require('express')
  ;

var app = module.exports = express();

require('./config/mongoose');

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

app.use(express.bodyParser());
app.enable('verbose errors');


app.use(app.router);

// There was an error
app.use(function (err, req, res, next) {
  res.send(err.status || 500, { error: err.message });
});

app.use(function (req, res) {
  res.send(404, { error: "Not found" });
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express server listening on port ' + port);