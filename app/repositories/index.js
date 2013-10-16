'use strict';
var AccountsRepository = require('./accountsRepository');


module.exports = {
  Accounts: new AccountsRepository({
    bucket: 'beacon-accounts'
  }),

};
