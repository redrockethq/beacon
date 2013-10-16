'use strict';

var expect = require('expect.js'),
  _ = require('lodash'),
  MemoryStorage = require('../../../../app/repositories/storage/memory'),
  uuid = require('node-uuid');

var memoryStorage = new MemoryStorage();

describe('MemoryStorage', function () {

  describe('#constructor(options)', function () {
    describe('_data', function () {
      it('should be empty', function () {
        expect(memoryStorage._data).to.be.ok();
        expect(memoryStorage._data.length).to.be(0);
      });
    });
  });

  describe("#all(callback)", function () {
    it('should return all entities', function (done) {
      memoryStorage.all(function (err, entities) {
        expect(err).to.not.be.ok();
        expect(entities).to.be.ok();
        expect(entities.length).to.be(0);
        done();
      });
    });

    it('should be able to seed storage with data', function (done) {
      var seededMemoryStorage = new MemoryStorage({
        initialData: ['1', '2', '3']
      });
      expect(seededMemoryStorage).to.be.ok();
      expect(seededMemoryStorage._data.length).to.be(3);
      seededMemoryStorage.all(function (err, entities) {
        expect(seededMemoryStorage._data.length).to.be(3);
        expect(err).to.not.be.ok();
        expect(entities).to.be.ok();
        expect(entities.length).to.be(3);
        done();
      });
    });

  });

  describe('#getByKey(key, callback)', function () {
    var storage;

    beforeEach(function () {
      storage = new MemoryStorage({
        initialData: [
          {
            id: 1,
            firstName: 'Chris',
            lastName: 'Rock'
          },
          {
            id: 2,
            firstName: 'Adam',
            lastName: 'Sandler'
          },
          {
            id: 3,
            firstName: 'Chris',
            lastName: 'Farley'
          }
        ]
      });
    });

    it('should be able to get an entity by key', function (done) {
      storage.getByKey(2, function (err, entity) {
        expect(err).to.not.be.ok();
        expect(entity).to.be.ok();
        expect(entity.id).to.be(1);
        expect(entity.firstName).to.be('Chris');
        expect(entity.lastName).to.be('Rock');
        done();
      });
    });
  });


  describe('#save(entity, callack)', function () {
    beforeEach(function () {
      memoryStorage = new MemoryStorage();
    });

    it('should require an object as an entity', function () {
      expect(function () {
        memoryStorage.save(function () {
        }, function (err, entity) {

        });
      }).to.throwError();

      expect(function () {
        memoryStorage.save({ }, function (err, entity) {

        });
      }).to.not.throwError();
    });

    it('should save the object', function (done) {
      expect(memoryStorage._data.length).to.be(0);
      memoryStorage.save({}, function (err, entity) {
        expect(err).to.not.be.ok();
        expect(memoryStorage._data.length).to.be(1);
        expect(entity).to.be.ok();
        done();
      });
    });

    it('should assign key if none is passed', function (done) {
      var keyless = {};
      expect(keyless.id).to.not.be.ok();
      expect(memoryStorage._data.length).to.be(0);
      memoryStorage.save({}, function (err, entity) {
        expect(err).to.not.be.ok();
        expect(memoryStorage._data.length).to.be(1);
        expect(entity.id).to.be.ok();
        console.log(entity);
        done();
      });
    });

    it('should ignore key if passed', function (done) {
      var hasKey = { id: uuid.v4()};
      expect(hasKey.id).to.be.ok();
      expect(memoryStorage._data.length).to.be(0);
      memoryStorage.save({}, function (err, entity) {
        expect(err).to.not.be.ok();
        expect(memoryStorage._data.length).to.be(1);
        expect(entity.id).to.be.ok(hasKey.id);
        console.log(entity);
        done();
      });
    });


  });


  describe('#remove(key, callack)', function () {
    var seededStorage;
    beforeEach(function () {
      seededStorage = new MemoryStorage({
        initialData: [
          {
            id: 1,
            firstName: 'Chris',
            lastName: 'Rock'
          },
          {
            id: 2,
            firstName: 'Adam',
            lastName: 'Sandler'
          },
          {
            id: 3,
            firstName: 'Chris',
            lastName: 'Farley'
          }
        ]
      });
    });

    it('should remove entity by key', function (done) {
      seededStorage.remove(1, function (err) {
        done();
      });
    })


  });

});
