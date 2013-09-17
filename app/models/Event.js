'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , _ = require('lodash');

var EventSchema = new Schema({
  applicationId: {type: ObjectId, ref: 'Application', required: true},
  kind: {type: String, required: true }
});