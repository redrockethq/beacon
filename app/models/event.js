//"use strict";
//
//var mongoose = require('mongoose')
//  , Schema = mongoose.Schema
//  , ObjectId = Schema.ObjectId
//  , _ = require('lodash')
//  ;
//
//var EventSchema = new Schema({
//  name: { type: String, required: true },
//  description: String,
//  accountId: { type: ObjectId, ref: 'Account' }
//});
//
//
//var Event = mongoose.model('Event', EventSchema);
//
//this.register('EventSchema').as.value(EventSchema);
//module.exports = function $init() {
//  this.register('Event').as.value(Event);
//}

var createClient = require('riakpbc').createClient
  , model = require('zukai')
  ;

var Event = model.createModel('Event', {
  bucket: 'beacon-events',
  connection: createClient(),
  schema: {
    properties: {
      name: { type: 'string', required: true },
      description: { type: 'string' },
    }
  }
});

