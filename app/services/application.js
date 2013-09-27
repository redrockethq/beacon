var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  ;

var AccountSchema = new Schema({
  name: {type: String, required: true, index: { unique: true } },
  description: String,
  slug: { type: String, required: true },
  accountToken: {type: String, required: true },
  isActive: { type: Boolean, default: true }
});


var Account = mongoose.model('Account', AccountSchema);
