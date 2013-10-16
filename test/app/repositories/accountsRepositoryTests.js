'use strict';

var expect = require('expect.js'),
  _ = require('lodash'),
  AccountRepository = require('../../../app/repositories/accountsRepository');

describe('AccountRepository', function () {
  var accountRepository = null;
  beforeEach(function () {
    accountRepository = new AccountRepository();
  });

  describe('#constructor(options)', function () {
    it('should have no accounts', function (done) {
      expect(accountRepository).to.be.ok();
      accountRepository.all(function (err, accounts) {
        expect(err).to.not.be.ok();
        expect(accounts).to.be.ok();
        expect(accounts.length).to.be(0);
        done();
      });
    });
  });

});