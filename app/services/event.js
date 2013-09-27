var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , _ = require('lodash')
  ;

var EventSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  accountId: { type: ObjectId, ref: 'Account' }
});


var Event = mongoose.model('Event', EventSchema);