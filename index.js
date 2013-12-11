'use strict';
var express = require('express')
  , models = require('./config/models')
  , slug = require('slug')
  , Account = models.Account
  , User = models.User
  , Event = models.Event
  ;

// Scheduling:  https://github.com/rschmukler/agenda

var app = module.exports = express();

require('./config/mongoose');

function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

app.use(express.bodyParser());
app.enable('verbose errors');


app.use('/api/v1', function (req, res, next) {
  var key = req.headers['x-auth-token'];
  if (!key)
    return next(error(400, 'Token not found.'));

  // key is invalid
  Account.findOne({token: key}, function (err, account) {
    if (err) {
      next(error(401, 'Invalid api key'))
    } else {
      if (account) {
        req.account = account;
        req.token = key;
        next();
      } else {
        next(error(401, 'Invalid api key'));
      }
    }
  });
});

app.use(app.router);

app.use(function (err, req, res, next) {
  res.send(err.status || 500, { error: err.message });
});

app.use(function (req, res) {
  res.send(404, { error: "Not found" });
});

app.post('/api/accounts/setup', function (req, res, next) {
  var account = new Account(req.body.account);
  account.slug = slug(account.name);
  account.save(function (err, savedAccount) {
    if (err) {
      Account.findOne({slug: account.slug},
        function (err, existingAccount) {
          if (existingAccount) {
            console.log(existingAccount);
            existingAccount.remove(function () {
              next(err(400, "Invalid account request"));
            });
          } else {
            next(err);
          }
        });
    } else {
      User.findOne({email: req.body.user.email},
        function (err, user) {
          if (user) {
            user.accounts.push(savedAccount._id);
          } else {
            user = new User(req.body.user);
          }
          user.save(function (err, userSaved) {
            if (err) {
              next(err);
            } else {
              res.send(200, savedAccount);
            }
          })
        });
    }
  });
});

app.get('/api/v1/events', function (req, res, next) {
  var size = req.query.size || 250;
  var index = req.query.index || 1;
  var q = req.query.q || "";

  Event.find({account: req.account._id}).sort('field -createdAt').exec(function (err, events) {
    if (err) next(err);
    res.send(200, {
      events: events,
      meta: {
        paging: {
          index: index,
          size: size,
          total: events.length
        },
        query: q
      }
    });
  });

//  Event.find({account: req.account._id}).sort('field -createdAt').paginate({}, page, pageSize,
//    function (err, pageCount, events) {
//      if (err) {
//        next(err);
//      } else {
//        res.send(200, {
//          events: events,
//          page: page,
//          pageCount: pageCount,
//          pageSize: pageSize
//        });
//      }
//    });
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express server listening on port ' + port);