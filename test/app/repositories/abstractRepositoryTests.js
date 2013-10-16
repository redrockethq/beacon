'use strict';

var expect = require('expect.js')
  , _ = require('lodash')
  , AbstractRepository = require('../../../app/repositories/abstractRepository')
  ;

describe('AbstractRepository', function () {
  describe('#constructor', function () {
    it('should require buckets', function () {
      expect(function () {
        new AbstractRepository();
      }).to.throwError();

      expect(function () {
        new AbstractRepository({
          bucket: 'blah'
        }).to.not.throwError();
      });

      var abstractRepository = new AbstractRepository({ bucket: 'blah' });
      expect(abstractRepository.bucket).to.be('blah');

    });


  });
});
