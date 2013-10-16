//var mongoose = require('mongoose')
//  , Schema = mongoose.Schema
//  , ObjectId = Schema.ObjectId
//  ;
//
//var AccountSchema = new Schema({
//  name: {type: String, required: true, index: { unique: true } },
//  description: String,
//  slug: { type: String, required: true },
//  accountToken: {type: String, required: true },
//  isActive: { type: Boolean, default: true }
//});
//
//
//var Account = mongoose.model('Account', AccountSchema);
//
//module.exports = function $init() {
//  this.register('Account').as.value(Account);
//  this.register('AccountSchema').as.value(AccountSchema);
//}

var createClient = require('riakpbc').createClient
  , model = require('zukai')
  ;

var Application = model.createModel('Accounts', {
  bucket: 'beacon-accounts',
  connection: createClient(),
  schema: {
    properties: {
      name: { type: 'string', required: true },
      description: { type: 'string' },
      accountToken: {type: 'string', required: true},
      isActive: {type: 'boolean' }
    }
  }
});