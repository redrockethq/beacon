var mongoose = require('mongoose');

module.exports = function $init($config) {
  mongoose.connect($config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback() {
    console.log("Database connected successfully to " + $config.db);
  });
};